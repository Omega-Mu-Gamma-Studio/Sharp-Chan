/**
 * cppHighlighter.js
 *
 * Zero-dependency C++ tokenizer for PlusPlus-chan.
 * Returns an HTML string with <span class="token-*"> wrappers.
 * Used by CodeBlock.jsx.
 *
 * Token classes:
 *   token-keyword     → blue   (if, for, class, return, etc.)
 *   token-type        → teal   (int, float, std::string, auto, etc.)
 *   token-string      → green  (quoted strings and char literals)
 *   token-comment     → gray   (// and block comments )
 *   token-number      → orange (integers, floats, hex, binary)
 *   token-method      → pink   (identifier immediately followed by '(')
 *   token-preprocessor→ purple (#include, #define, #pragma, etc.)
 *   token-class-name  → yellow (PascalCase identifiers / after class/struct)
 *   token-operator    → red    (::, ->, <<, >>, *, &, etc.)
 */

// --- C++ control flow & structure keywords ---
const KEYWORDS = new Set([
  'alignas','alignof','and','and_eq','asm','auto',
  'bitand','bitor','break','case','catch','class',
  'compl','concept','const','consteval','constexpr','constinit',
  'const_cast','continue','co_await','co_return','co_yield',
  'decltype','default','delete','do','dynamic_cast',
  'else','enum','explicit','export','extern',
  'false','final','for','friend',
  'goto','if','inline',
  'mutable','namespace','new','noexcept','not','not_eq','nullptr',
  'operator','or','or_eq',
  'override','private','protected','public',
  'register','reinterpret_cast','requires','return',
  'sizeof','static','static_assert','static_cast','struct','switch',
  'template','this','thread_local','throw','true','try','typedef','typeid','typename',
  'union','using','virtual','volatile',
  'while','xor','xor_eq',
]);

// --- C++ built-in types and common std types ---
const TYPES = new Set([
  // Primitives
  'bool','char','char8_t','char16_t','char32_t','wchar_t',
  'int','long','short','signed','unsigned','void','float','double',
  // Sized integers
  'int8_t','int16_t','int32_t','int64_t',
  'uint8_t','uint16_t','uint32_t','uint64_t',
  'size_t','ptrdiff_t','nullptr_t',
  // Common std types (unqualified usage)
  'string','wstring','string_view',
  'vector','array','list','deque','forward_list',
  'map','unordered_map','multimap','unordered_multimap',
  'set','unordered_set','multiset','unordered_multiset',
  'stack','queue','priority_queue',
  'pair','tuple','optional','variant','any',
  'unique_ptr','shared_ptr','weak_ptr',
  'function','thread','mutex','lock_guard','unique_lock',
  'fstream','ifstream','ofstream','stringstream','iostream',
  'exception','runtime_error','logic_error','out_of_range',
  'initializer_list','iterator','reverse_iterator',
  'cin','cout','cerr','clog','endl',
]);

// --- Operators worth highlighting ---
const OPERATOR_REGEX = /::|->|\.\*|->*|<<|>>|&&|\|\||[+\-*/%&|^~!<>=]=?|[?:]/;

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

    // ── Single-line comment // ──
    if (line[i] === '/' && line[i + 1] === '/') {
      result += `<span class="token-comment">${escapeHtml(line.slice(i))}</span>`;
      break;
    }

    // ── Preprocessor directive # ──
    if (line[i] === '#' && (i === 0 || /\s/.test(line[i - 1]))) {
      let end = i;
      while (end < len && line[end] !== ' ' && line[end] !== '\t') end++;
      // grab the rest of the directive (e.g. the filename in #include)
      result += `<span class="token-preprocessor">${escapeHtml(line.slice(i, end))}</span>`;
      i = end;
      continue;
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
      // consume suffixes: f, F, l, L, u, U, ul, ll, etc.
      while (end < len && /[fFlLuU]/.test(line[end])) end++;
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
      else if (/^[A-Z]/.test(word)) cls = 'token-class-name';

      result += cls
        ? `<span class="${cls}">${escapeHtml(word)}</span>`
        : escapeHtml(word);

      i = end;
      continue;
    }

    // ── Multi-char operators: ::, ->, <<, >>, etc. ──
    {
      const slice = line.slice(i);
      const match = slice.match(/^(::|->|\.\*|->*|<<|>>|&&|\|\||[+\-*/%&|^~!<>=]=?)/);
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