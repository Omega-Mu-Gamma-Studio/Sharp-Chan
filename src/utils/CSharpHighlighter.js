/**
 * CSharpHighlighter.js
 *
 * Zero-dependency C# tokenizer for Sharp-chan.
 * Returns an HTML string with <span class="token-*"> wrappers.
 * Used by CodeBlock.jsx.
 *
 * Token classes:
 *   token-keyword      → blue    (if, for, class, return, var, async, etc.)
 *   token-type         → teal    (int, string, bool, var, List, Dictionary, etc.)
 *   token-string       → green   (quoted, verbatim @"", and interpolated $"" strings)
 *   token-comment      → gray    (// and block comments)
 *   token-number       → orange  (integers, floats, hex, binary, suffixes)
 *   token-method       → pink    (identifier immediately followed by '(')
 *   token-preprocessor → purple  (#if, #region, #nullable, #pragma, etc.)
 *   token-attribute    → lavender ([Serializable], [SerializeField], etc.)
 *   token-class-name   → yellow  (PascalCase identifiers / after class/struct)
 *   token-operator     → red     (=>, ??, ?., <<, &&, etc.)
 */

// --- C# keywords (reserved + contextual) ---
const KEYWORDS = new Set([
  // Reserved keywords
  'abstract','as','base','break','case','catch','checked','class','const','continue',
  'default','delegate','do','else','enum','event','explicit','extern',
  'false','finally','fixed','for','foreach','goto','if','implicit','in','interface',
  'internal','is','lock','namespace','new','null','operator','out','override',
  'params','private','protected','public','readonly','ref','return','sealed',
  'sizeof','stackalloc','static','struct','switch','this','throw','true','try',
  'typeof','unchecked','unsafe','using','virtual','volatile','while',
  // Contextual keywords
  'add','alias','ascending','async','await','by','descending','dynamic',
  'equals','from','get','global','group','init','into','join','let',
  'nameof','notnull','on','orderby','partial','record','remove','required',
  'select','set','unmanaged','value','var','when','where','with','yield',
]);

// --- C# built-in / primitive types + common BCL / Unity types used unqualified ---
const TYPES = new Set([
  // Primitives (also reserved keywords, but colored as types like the C++ version did)
  'bool','byte','sbyte','char','decimal','double','float',
  'int','uint','long','ulong','short','ushort','object','string','void',
  // Common System / BCL types often used without full qualification
  'Boolean','Byte','SByte','Char','Decimal','Double','Single','Int16','Int32','Int64',
  'UInt16','UInt32','UInt64','Object','String','Void',
  'Console','Math','Array','List','Dictionary','HashSet','Queue','Stack',
  'IEnumerable','IEnumerator','IList','ICollection','IDictionary','IComparable',
  'IDisposable','IReadOnlyList','IReadOnlyDictionary',
  'Action','Func','Predicate','Task','ValueTask','CancellationToken',
  'Exception','ArgumentException','ArgumentNullException','InvalidOperationException',
  'NullReferenceException','IndexOutOfRangeException','NotImplementedException',
  'DateTime','DateTimeOffset','TimeSpan','Guid','StringBuilder','Nullable',
  'Convert','Environment','Random','Thread','Tuple','ValueTuple','Uri','Regex',
  // Common Unity types (this project targets Unity/game-dev lessons)
  'MonoBehaviour','GameObject','Transform','Rigidbody','Rigidbody2D','Collider',
  'Collider2D','Collision','Collision2D','Vector2','Vector3','Vector4','Quaternion',
  'Component','ScriptableObject','Time','Input','Camera','Animator','AudioSource',
  'SpriteRenderer','Debug','ForceMode2D','ForceMode',
]);

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function tokenize(line) {
  let result = '';
  let i = 0;
  const len = line.length;

  while (i < len) {

    // ── Block comment opening /* (handle multiline state externally if needed) ──
    if (line[i] === '/' && line[i + 1] === '*') {
      let end = i + 2;
      while (end < len - 1 && !(line[end] === '*' && line[end + 1] === '/')) end++;
      end = Math.min(end + 2, len);
      result += `<span class="token-comment">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // ── Single-line comment // (also covers /// XML doc comments) ──
    if (line[i] === '/' && line[i + 1] === '/') {
      result += `<span class="token-comment">${escapeHtml(line.slice(i))}</span>`;
      break;
    }

    // ── Preprocessor directive # (#if, #region, #nullable, #pragma, etc.) ──
    if (line[i] === '#' && (i === 0 || /\s/.test(line[i - 1]))) {
      let end = i;
      while (end < len && line[end] !== ' ' && line[end] !== '\t') end++;
      // grab the rest of the directive too (e.g. the condition in #if DEBUG)
      const rest = len;
      result += `<span class="token-preprocessor">${escapeHtml(line.slice(i, rest))}</span>`;
      i = rest;
      continue;
    }

    // ── Attribute [Serializable], [SerializeField], [HttpGet("route")] ──
    if (line[i] === '[' && /[a-zA-Z_]/.test(line[i + 1] || '')) {
      // Only treat as an attribute if the bracket isn't preceded by an identifier/bracket
      // (which would make it array indexing/declaration instead, e.g. int[] or arr[0])
      const prevChar = line[i - 1];
      const looksLikeIndexer = prevChar && /[\w\]]/.test(prevChar);
      if (!looksLikeIndexer) {
        let end = i + 1;
        let depth = 1;
        while (end < len && depth > 0) {
          if (line[end] === '[') depth++;
          else if (line[end] === ']') depth--;
          end++;
        }
        result += `<span class="token-attribute">${escapeHtml(line.slice(i, end))}</span>`;
        i = end;
        continue;
      }
    }

    // ── Verbatim / interpolated string prefixes: @"...", $"...", $@"...", @$"..." ──
    if (line[i] === '@' || line[i] === '$') {
      let prefixEnd = i;
      let isVerbatim = false;
      let sawPrefix = false;
      while (prefixEnd < len && prefixEnd < i + 2 && (line[prefixEnd] === '@' || line[prefixEnd] === '$')) {
        if (line[prefixEnd] === '@') isVerbatim = true;
        sawPrefix = true;
        prefixEnd++;
      }
      if (sawPrefix && line[prefixEnd] === '"') {
        let end = prefixEnd + 1;
        if (isVerbatim) {
          // Verbatim strings: "" is an escaped quote, backslashes are literal
          while (end < len) {
            if (line[end] === '"' && line[end + 1] === '"') { end += 2; continue; }
            if (line[end] === '"') { end++; break; }
            end++;
          }
        } else {
          // Interpolated (non-verbatim): normal backslash escaping
          while (end < len) {
            if (line[end] === '\\') { end += 2; continue; }
            if (line[end] === '"') { end++; break; }
            end++;
          }
        }
        result += `<span class="token-string">${escapeHtml(line.slice(i, end))}</span>`;
        i = end;
        continue;
      }
      // Not a string prefix (e.g. a verbatim identifier like @class, or a lone '$').
      // Fall through and let the default/word handling deal with it.
    }

    // ── String literal " ──
    if (line[i] === '"') {
      let end = i + 1;
      while (end < len) {
        if (line[end] === '\\') { end += 2; continue; }
        if (line[end] === '"') { end++; break; }
        end++;
      }
      result += `<span class="token-string">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // ── Char literal ' ──
    if (line[i] === "'") {
      let end = i + 1;
      while (end < len) {
        if (line[end] === '\\') { end += 2; continue; }
        if (line[end] === "'") { end++; break; }
        end++;
      }
      result += `<span class="token-string">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // ── Number literal (int, float, hex 0x, binary 0b, suffixes) ──
    if (/[0-9]/.test(line[i]) && (i === 0 || !/[\w]/.test(line[i - 1]))) {
      let end = i;
      // hex
      if (line[i] === '0' && (line[i + 1] === 'x' || line[i + 1] === 'X')) {
        end += 2;
        while (end < len && /[0-9a-fA-F_]/.test(line[end])) end++;
      // binary
      } else if (line[i] === '0' && (line[i + 1] === 'b' || line[i + 1] === 'B')) {
        end += 2;
        while (end < len && /[01_]/.test(line[end])) end++;
      } else {
        while (end < len && /[0-9._eE]/.test(line[end])) end++;
      }
      // consume suffixes: f, F, d, D, m, M, l, L, u, U, ul, ll, etc.
      while (end < len && /[fFdDmMlLuU]/.test(line[end])) end++;
      result += `<span class="token-number">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // ── Word: keyword / type / method / identifier ──
    if (/[a-zA-Z_]/.test(line[i])) {
      let end = i;
      while (end < len && /[\w]/.test(line[end])) end++;
      const word = line.slice(i, end);

      // Peek past whitespace to detect function/method call
      let j = end;
      while (j < len && line[j] === ' ') j++;
      const isCall = line[j] === '(';

      let cls = '';
      if (KEYWORDS.has(word))        cls = 'token-keyword';
      else if (TYPES.has(word))      cls = 'token-type';
      else if (isCall)               cls = 'token-method';
      else if (/^[A-Z]/.test(word))  cls = 'token-class-name';

      result += cls
        ? `<span class="${cls}">${escapeHtml(word)}</span>`
        : escapeHtml(word);

      i = end;
      continue;
    }

    // ── Multi-char operators: =>, ??, ??=, ?., <<, &&, etc. ──
    {
      const slice = line.slice(i);
      const match = slice.match(/^(\?\?=|\?\?|\?\.|=>|::|<<=|>>=|<<|>>|&&|\|\||[+\-*/%&|^~!<>=]=?)/);
      if (match) {
        result += `<span class="token-operator">${escapeHtml(match[0])}</span>`;
        i += match[0].length;
        continue;
      }
    }

    // ── Everything else (punctuation, braces, semicolons) ──
    result += escapeHtml(line[i]);
    i++;
  }

  return result;
}
