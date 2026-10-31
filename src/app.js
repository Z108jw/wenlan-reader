/* =========================================================
   文澜 WENLAN · 英文文献批注工作台
   Single-file, offline-first reading and annotation studio.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Constants
     --------------------------------------------------------- */

  const LS_DOCS = 'wenlan.docs.v1';
  const LS_FOLDERS = 'wenlan.folders.v1';
  const LS_SETTINGS = 'wenlan.settings.v1';
  const LS_EXPORT_PREFIX = 'wenlan.export.v1.';
  const MAX_RECENT = 24;
  const APP_VERSION = 1;

  const COLORS = {
    ochre: { label: '秋赭', hex: '#c59a58', soft: '#efdda8' },
    sage: { label: '苔青', hex: '#6d846a', soft: '#d6e2cf' },
    clay: { label: '陶砂', hex: '#b87358', soft: '#eed3c6' },
    mist: { label: '远黛', hex: '#7996a1', soft: '#d4e1e5' }
  };

  const DEFAULT_TAGS = ['核心论点', '研究方法', '关键证据', '理论对话', '待讨论', '我的疑问', '灵感摘记'];

  const ICONS = {
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 16V4m0 0 4.5 4.5M12 4 7.5 8.5"/><path d="M5 14.5v3A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-3"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6.5 3.5h8L19 8v12.5H6.5z"/><path d="M14.5 3.5V8H19M9.2 12.2h1.4a1.2 1.2 0 0 1 0 2.4H9.2v-4.6M9.2 14.6v2.8M13.3 10v7.4h1a2.2 2.2 0 0 0 2.2-2.2v-3a2.2 2.2 0 0 0-2.2-2.2zM18 17.4v-7.2h2.4"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="3.1"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4.04v-.08A1.7 1.7 0 0 0 8.9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.5 15a1.7 1.7 0 0 0-1.56-1.03H3v-4.04h.08A1.7 1.7 0 0 0 4.64 8.9a1.7 1.7 0 0 0-.34-1.88L4.24 6.96 7.1 4.1l.06.06A1.7 1.7 0 0 0 9.04 4.5 1.7 1.7 0 0 0 10.07 2.94V2.86h4.04v.08a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 19.54 8.9a1.7 1.7 0 0 0 1.56 1.03H21v4.04h-.08A1.7 1.7 0 0 0 19.4 15z"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 4v11m0 0 4-4m-4 4-4-4"/><path d="M4.5 15.5v3A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-3"/></svg>',
    translate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 5.5h9M8.5 3.5v2M11.5 5.5c0 4.1-2.8 7.5-7 9.5"/><path d="M6 10.5c1.2 2.2 3.5 4 6 5"/><path d="m13.8 20 3.1-8.5L20 20M14.9 17h4.1"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 10.5h6"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 20 4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16z"/><path d="m14.7 6.5 3 3"/></svg>',
    locate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4.5 7h15M9 7V4.5h6V7M7 7l.8 12.2a1.8 1.8 0 0 0 1.8 1.8h4.8a1.8 1.8 0 0 0 1.8-1.8L17 7"/><path d="M10 10.5v7M14 10.5v7"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 2.8c.6 4.6 2.6 6.6 7.2 7.2-4.6.6-6.6 2.6-7.2 7.2-.6-4.6-2.6-6.6-7.2-7.2 4.6-.6 6.6-2.6 7.2-7.2Z"/><path d="M19 16.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M9.5 6.5c-3 1.2-4.5 3.5-4.5 6.8V19h6v-6H7.4c.2-2 1.1-3.3 3-4.3zM20 6.5c-3 1.2-4.5 3.5-4.5 6.8V19h6v-6h-3.6c.2-2 1.1-3.3 3-4.3z"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5M3 17l9 5 9-5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m4.5 12.5 5 5 10-11"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h4l2 2h6a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z"/><path d="M3.5 9.5h17"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 10.5V17M12 7.3v.2"/></svg>'
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------------------------------------------------------
     Utilities
     --------------------------------------------------------- */

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(value) {
    return escapeHTML(value).replace(/`/g, '&#96;');
  }

  function uid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function normalizeSpace(text) {
    return String(text || '')
      .replace(/\u00ad/g, '')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeForMatch(text) {
    return normalizeSpace(text)
      .toLowerCase()
      .replace(/[“”‘’]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function shortText(text, max) {
    const value = normalizeSpace(text);
    if (value.length <= max) return value;
    return value.slice(0, max).replace(/\s+\S*$/, '') + '…';
  }

  function formatClock(date) {
    const d = date ? new Date(date) : new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    if (sameDay) return '今天 ' + formatClock(d);
    const yesterday = new Date(now.getTime() - 86400000);
    if (d.toDateString() === yesterday.toDateString()) return '昨天 ' + formatClock(d);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function safeFilename(text) {
    return normalizeSpace(text)
      .replace(/[\\/:*?"<>|]/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 72)
      .trim() || '文献';
  }

  function cleanDocumentName(name) {
    return normalizeSpace(String(name || '').replace(/\.pdf$/i, '').replace(/[_]+/g, ' ')).slice(0, 120);
  }

  function displayNameOf(doc) {
    if (!doc) return '未命名文献';
    return normalizeSpace(doc.displayName || cleanDocumentName(doc.originalName) || doc.title || '未命名文献');
  }

  function sourceTextOf(doc) {
    if (!doc) return '';
    return [doc.source, doc.doi ? 'DOI: ' + doc.doi : ''].filter(Boolean).join(' · ');
  }

  function countWords(text) {
    return (String(text || '').match(/[A-Za-z][A-Za-z''-]*/g) || []).length;
  }

  function debounce(fn, wait) {
    let timer = null;
    return function () {
      const args = arguments;
      const ctx = this;
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(ctx, args), wait);
    };
  }

  function icon(name) {
    return ICONS[name] || '';
  }

  function getColor(key) {
    return COLORS[key] || COLORS.sage;
  }

  function getTag(key) {
    return currentTags().includes(key) ? key : '';
  }

  function currentTags() {
    return Array.isArray(state.tags) ? state.tags : DEFAULT_TAGS;
  }

  function sanitizeTag(value) {
    return normalizeSpace(value || '').replace(/[#＃]/g, '').slice(0, 18).trim();
  }

  function svgExternal(name) {
    return icon(name);
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function defaultSettings() {
    return {
      provider: 'auto',
      endpoint: 'https://api.deepseek.com/v1/chat/completions',
      model: 'deepseek-chat',
      apiKey: '',
      autoTranslate: true
    };
  }

  function loadSettings() {
    const saved = readJSON(LS_SETTINGS, {});
    return Object.assign(defaultSettings(), saved && typeof saved === 'object' ? saved : {});
  }

  /* ---------------------------------------------------------
     State
     --------------------------------------------------------- */

  const settings = loadSettings();

  const state = {
    view: 'home',
    doc: null,
    annotations: [],
    translations: {},
    tags: DEFAULT_TAGS.slice(),
    showBilingual: false,
    showOriginal: false,
    tocOpen: false,
    zoom: 1,
    marginWidth: 0,
    editor: null,
    activeAnnId: null,
    query: '',
    filter: 'all',
    scrollTop: 0,
    embedded: false,
    revision: 0,
    updatedAt: 0,
    lastSaved: null,
    pdfBusy: false,
    job: null,
    pendingFocus: false
  };

  const savedLayout = readJSON('wenlan.layout.v1', {});
  if (savedLayout && typeof savedLayout === 'object') {
    state.zoom = clamp(Number(savedLayout.zoom) || 1, 0.7, 2.2);
    state.marginWidth = clamp(Number(savedLayout.marginWidth) || 0, 0, 680);
  }

  const runtime = {
    sentences: [],
    bySid: new Map(),
    byBlock: new Map(),
    blockMeta: new Map(),
    annNumbers: new Map(),
    annsBySid: new Map(),
    annSpans: new Map(),
    order: new Map(),
    pendingSelection: null,
    tm: new Map(),
    pdfjs: null,
    pdfjsPromise: null,
    pageCacheSavedFor: null,
    pageCacheSavingFor: null,
    syncFrame: null,
    suppressSyncUntil: 0,
    lastSyncAnnId: null
  };

  const app = $('#app');
  const overlays = $('#overlays');
  const toastRoot = $('#toast-root');

  function currentSettings() {
    return settings;
  }

  function buildTranslationMemory() {
    runtime.tm = new Map();
    const list = Array.isArray(window.__WENLAN_TRANSLATIONS__) ? window.__WENLAN_TRANSLATIONS__ : [];
    list.forEach((pair) => {
      if (!pair || !pair.en || !pair.zh) return;
      const key = normalizeForMatch(pair.en);
      if (key) runtime.tm.set(key, pair.zh);
    });
  }

  /* ---------------------------------------------------------
     Document preparation & sentence segmentation
     --------------------------------------------------------- */

  function splitSentences(text) {
    const clean = normalizeSpace(text);
    if (!clean) return [];
    let segments = [];
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
        segments = Array.from(segmenter.segment(clean), (s) => s.segment.trim()).filter(Boolean);
      } catch (err) {
        segments = [];
      }
    }
    if (!segments.length) {
      segments = clean.split(/(?<=[.!?])\s+(?=[A-Z0-9"'(\[])/).map((s) => s.trim()).filter(Boolean);
    }
    if (!segments.length) segments = [clean];

    const output = [];
    segments.forEach((segment) => {
      if (!segment) return;
      if (segment.length > 900) {
        const pieces = segment.split(/(?<=[;:])\s+/);
        if (pieces.length > 1) {
          pieces.forEach((p) => { if (p.trim()) output.push(p.trim()); });
          return;
        }
      }
      output.push(segment);
    });
    return output;
  }

  function prepareDoc(doc, translations) {
    runtime.sentences = [];
    runtime.bySid = new Map();
    runtime.byBlock = new Map();
    runtime.blockMeta = new Map();
    runtime.annsBySid = new Map();
    runtime.annSpans = new Map();
    runtime.order = new Map();
    runtime.pendingSelection = null;

    let counter = 0;
    let section = '摘要';
    let paraNo = 0;

    function rememberSentence(text, blockIndex, meta, sid) {
      const clean = normalizeSpace(text);
      if (!clean) return null;
      const sentence = {
        sid,
        text: clean,
        blockIndex,
        page: meta.page || 1,
        section: meta.section,
        paraNo: meta.paraNo || 0
      };
      runtime.sentences.push(sentence);
      runtime.bySid.set(sentence.sid, sentence);
      return sentence;
    }

    function rememberTranslation(list) {
      list.forEach((sentence) => {
        if (translations && translations[sentence.sid]) return;
        const known = runtime.tm.get(normalizeForMatch(sentence.text));
        if (known && translations) translations[sentence.sid] = known;
      });
    }

    // Abstract keeps its original sentence ids (s0, s1, …) so annotations saved
    // by older versions remain attached to the same text.
    if (doc.abstract) {
      const abstractList = splitSentences(doc.abstract).map((text) => {
        const sentence = rememberSentence(text, -1, { section: '摘要', paraNo: 0, page: 1 }, 's' + counter);
        counter += 1;
        return sentence;
      }).filter(Boolean);
      runtime.byBlock.set(-1, abstractList);
      runtime.blockMeta.set(-1, { section: '摘要', paraNo: 0, page: 1, kind: 'abstract' });
      rememberTranslation(abstractList);
    }

    (doc.blocks || []).forEach((block, blockIndex) => {
      const isHeading = /^h[2-5]$/.test(block.type);
      if (isHeading) {
        const cleaned = normalizeSpace(block.text).replace(/^\d+(\.\d+)*\.?\s*/, '');
        section = cleaned || section;
        paraNo = 0;
      }
      if (block.type === 'abstract') section = '摘要';
      if (block.type === 'p') paraNo += 1;

      const annotatable = block.type === 'p' || block.type === 'abstract' ||
        block.type === 'caption' || isHeading;
      const meta = {
        section,
        paraNo,
        page: block.page || 1,
        kind: isHeading ? 'heading' : (block.type === 'caption' ? 'caption' : 'body')
      };
      runtime.blockMeta.set(blockIndex, meta);
      if (!annotatable) return;

      // A heading is one annotation unit; paragraphs and captions keep normal
      // sentence segmentation.
      const pieces = isHeading ? [normalizeSpace(block.text)] : splitSentences(block.text);
      const list = pieces.map((text, pieceIndex) => {
        // Heading / metadata ids deliberately do not consume the paragraph
        // counter, preserving the ids of already annotated body sentences.
        const sid = isHeading ? 'h_' + blockIndex + '_' + pieceIndex : 's' + counter;
        const sentence = rememberSentence(text, blockIndex, meta, sid);
        if (!isHeading) counter += 1;
        return sentence;
      }).filter(Boolean);
      runtime.byBlock.set(blockIndex, list);
      rememberTranslation(list);
    });

    // Metadata and title are rendered before the abstract but get separate id
    // namespaces, so existing annotations stay intact.
    const titleMeta = { section: '题名', paraNo: 0, page: 1, kind: 'heading' };
    if (doc.title) {
      const list = [rememberSentence(doc.title, -2, titleMeta, 'm_title')].filter(Boolean);
      runtime.byBlock.set(-2, list);
      runtime.blockMeta.set(-2, titleMeta);
      rememberTranslation(list);
    }
    if (doc.authors) {
      const meta = { section: '作者', paraNo: 0, page: 1, kind: 'meta' };
      const list = [rememberSentence(doc.authors, -3, meta, 'm_authors')].filter(Boolean);
      runtime.byBlock.set(-3, list);
      runtime.blockMeta.set(-3, meta);
      rememberTranslation(list);
    }
    const sourceText = [doc.source, doc.doi ? 'DOI: ' + doc.doi : ''].filter(Boolean).join(' · ');
    if (sourceText) {
      const meta = { section: '来源', paraNo: 0, page: 1, kind: 'meta' };
      const list = [rememberSentence(sourceText, -4, meta, 'm_source')].filter(Boolean);
      runtime.byBlock.set(-4, list);
      runtime.blockMeta.set(-4, meta);
      rememberTranslation(list);
    }
    if (doc.keywords && doc.keywords.length) {
      const meta = { section: '关键词', paraNo: 0, page: 1, kind: 'meta' };
      const list = doc.keywords.map((keyword, index) => rememberSentence(keyword, -5, meta, 'k_' + index)).filter(Boolean);
      runtime.byBlock.set(-5, list);
      runtime.blockMeta.set(-5, meta);
      rememberTranslation(list);
    }

    // Rebuild the flat reading order to match the visible order of the page.
    const visibleBlocks = [-2, -3, -4, -1, -5];
    (doc.blocks || []).forEach((_, index) => visibleBlocks.push(index));
    const ordered = [];
    visibleBlocks.forEach((index) => {
      (runtime.byBlock.get(index) || []).forEach((sentence) => ordered.push(sentence));
    });
    runtime.sentences = ordered;
    runtime.order = new Map(ordered.map((sentence, index) => [sentence.sid, index]));

    recalcAnnotationMaps();
  }

  function recalcAnnotationMaps() {
    state.annotations.forEach((ann) => {
      const start = runtime.bySid.get(ann.range && ann.range.startSid ? ann.range.startSid : ann.sid);
      if (!start) return;
      if (!ann.range || !runtime.bySid.has(ann.range.startSid) || !runtime.bySid.has(ann.range.endSid)) {
        ann.range = {
          startSid: start.sid,
          startOffset: 0,
          endSid: start.sid,
          endOffset: start.text.length
        };
      }
      ann.range.startOffset = clamp(Number(ann.range.startOffset) || 0, 0, start.text.length);
      const endSentence = runtime.bySid.get(ann.range.endSid) || start;
      ann.range.endOffset = clamp(Number(ann.range.endOffset) || endSentence.text.length, 0, endSentence.text.length);
      if (!ann.sid) ann.sid = start.sid;
    });

    const sorted = state.annotations.slice().sort((a, b) => {
      const ai = runtime.order.get(a.range ? a.range.startSid : a.sid) || 0;
      const bi = runtime.order.get(b.range ? b.range.startSid : b.sid) || 0;
      if (ai !== bi) return ai - bi;
      return (a.range ? a.range.startOffset : 0) - (b.range ? b.range.startOffset : 0);
    });
    runtime.annNumbers = new Map();
    runtime.annsBySid = new Map();
    runtime.annSpans = new Map();
    sorted.forEach((ann, index) => {
      runtime.annNumbers.set(ann.id, index + 1);
      const startIndex = runtime.order.get(ann.range.startSid);
      const endIndex = runtime.order.get(ann.range.endSid);
      if (startIndex == null || endIndex == null) return;
      const first = Math.min(startIndex, endIndex);
      const last = Math.max(startIndex, endIndex);
      runtime.annSpans.set(ann.id, {
        startIndex: first,
        endIndex: last,
        startSid: ann.range.startSid,
        endSid: ann.range.endSid,
        startOffset: ann.range.startOffset,
        endOffset: ann.range.endOffset
      });
      for (let i = first; i <= last; i += 1) {
        const sentence = runtime.sentences[i];
        if (!sentence) continue;
        if (!runtime.annsBySid.has(sentence.sid)) runtime.annsBySid.set(sentence.sid, []);
        runtime.annsBySid.get(sentence.sid).push(ann);
      }
    });
  }

  function rangeForSentence(sentence) {
    return {
      startSid: sentence.sid,
      startOffset: 0,
      endSid: sentence.sid,
      endOffset: sentence.text.length
    };
  }

  function isFullSentenceRange(range) {
    return range && range.startSid === range.endSid && range.startOffset === 0 &&
      runtime.bySid.has(range.startSid) && range.endOffset >= runtime.bySid.get(range.startSid).text.length;
  }

  function annotationLocalInterval(ann, sentence) {
    const span = runtime.annSpans.get(ann.id);
    if (!span) return null;
    const index = runtime.order.get(sentence.sid);
    if (index == null || index < span.startIndex || index > span.endIndex) return null;
    const start = index === span.startIndex ? span.startOffset : 0;
    const end = index === span.endIndex ? span.endOffset : sentence.text.length;
    if (end <= start) return null;
    return { start: clamp(start, 0, sentence.text.length), end: clamp(end, 0, sentence.text.length) };
  }

  function sidNumber(sid) {
    const n = parseInt(String(sid || '').replace(/^s/, ''), 10);
    return Number.isFinite(n) ? n : 0;
  }

  function hydrate(payload) {
    if (!payload || !payload.doc) return false;
    state.doc = payload.doc;
    if (!state.doc.displayName) {
      state.doc.displayName = cleanDocumentName(state.doc.originalName) || state.doc.title || '未命名文献';
    }
    state.annotations = Array.isArray(payload.annotations) ? payload.annotations : [];
    state.translations = payload.translations && typeof payload.translations === 'object' ? payload.translations : {};
    state.tags = Array.isArray(payload.tags)
      ? Array.from(new Set(payload.tags.map(sanitizeTag).filter(Boolean)))
      : DEFAULT_TAGS.slice();
    state.annotations.forEach((ann) => {
      if (ann.tag && !state.tags.includes(ann.tag)) state.tags.push(ann.tag);
    });
    state.showBilingual = Boolean(payload.showBilingual);
    state.showOriginal = false;
    if (Number(payload.zoom)) state.zoom = clamp(Number(payload.zoom), 0.7, 2.2);
    if (Number(payload.marginWidth)) state.marginWidth = clamp(Number(payload.marginWidth), 0, 680);
    state.tocOpen = false;
    state.revision = Number(payload.revision) || 0;
    state.updatedAt = Number(payload.updatedAt) || Date.now();
    state.activeAnnId = null;
    state.editor = null;
    state.query = '';
    state.filter = 'all';
    state.scrollTop = 0;
    prepareDoc(state.doc, state.translations);
    return true;
  }

  function snapshot(includeRuntime) {
    const payload = {
      format: 'wenlan.annotated.v1',
      version: APP_VERSION,
      exportedAt: new Date().toISOString(),
      updatedAt: state.updatedAt,
      revision: state.revision,
      doc: JSON.parse(JSON.stringify(state.doc)),
      annotations: JSON.parse(JSON.stringify(state.annotations)),
      translations: JSON.parse(JSON.stringify(state.translations)),
      tags: JSON.parse(JSON.stringify(currentTags())),
      showBilingual: state.showBilingual,
      zoom: state.zoom,
      marginWidth: state.marginWidth
    };
    return payload;
  }

  /* ---------------------------------------------------------
     Persistence
     --------------------------------------------------------- */

  const IDB_NAME = 'wenlan.page-cache.v1';
  let pageDbPromise = null;

  function getPageDb() {
    if (pageDbPromise) return pageDbPromise;
    pageDbPromise = new Promise((resolve) => {
      try {
        const request = indexedDB.open(IDB_NAME, 1);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains('pages')) db.createObjectStore('pages');
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
    return pageDbPromise;
  }

  async function saveCachedImages(id, images) {
    if (!id || !images || !images.length) return false;
    const db = await getPageDb();
    if (!db) return false;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction('pages', 'readwrite');
        tx.objectStore('pages').put(images, id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async function loadCachedImages(id) {
    if (!id) return null;
    const db = await getPageDb();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction('pages', 'readonly');
        const req = tx.objectStore('pages').get(id);
        req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result : null);
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  async function deleteCachedImages(id) {
    if (!id) return;
    const db = await getPageDb();
    if (!db) return;
    try {
      const tx = db.transaction('pages', 'readwrite');
      tx.objectStore('pages').delete(id);
    } catch (err) { /* noop */ }
  }

  async function clearCachedImages() {
    const db = await getPageDb();
    if (!db) return;
    try {
      const tx = db.transaction('pages', 'readwrite');
      tx.objectStore('pages').clear();
    } catch (err) { /* noop */ }
  }

  function exportStorageKey(id) {
    return LS_EXPORT_PREFIX + id;
  }

  function readRecentDocs() {
    const list = readJSON(LS_DOCS, []);
    if (!Array.isArray(list)) return [];
    return list
      .filter((item) => item && item.doc && item.doc.id)
      .sort((a, b) => (Number(b.updatedAt) || 0) - (Number(a.updatedAt) || 0));
  }

  function readFolders() {
    const list = readJSON(LS_FOLDERS, []);
    if (!Array.isArray(list)) return [];
    return list
      .filter((folder) => folder && folder.id && folder.name)
      .map((folder) => ({
        id: folder.id,
        name: String(folder.name).slice(0, 40),
        docIds: Array.isArray(folder.docIds) ? Array.from(new Set(folder.docIds.filter(Boolean))) : [],
        createdAt: Number(folder.createdAt) || Date.now()
      }));
  }

  function writeFolders(list) {
    return writeJSON(LS_FOLDERS, list.map((folder) => ({
      id: folder.id,
      name: folder.name,
      docIds: folder.docIds,
      createdAt: folder.createdAt
    })));
  }

  function folderForDoc(docId, folders) {
    return (folders || readFolders()).find((folder) => folder.docIds.includes(docId)) || null;
  }

  function removeDocFromFolders(docId) {
    const folders = readFolders();
    folders.forEach((folder) => {
      folder.docIds = folder.docIds.filter((id) => id !== docId);
    });
    writeFolders(folders);
  }

  function writeRecentDocs(list) {
    return writeJSON(LS_DOCS, list.slice(0, MAX_RECENT));
  }

  function persistNow() {
    if (!state.doc) return true;
    const fullDoc = JSON.parse(JSON.stringify(state.doc));
    const pageImages = Array.isArray(fullDoc.pageImages) ? fullDoc.pageImages : [];
    fullDoc.pageImages = [];
    const record = {
      doc: fullDoc,
      annotations: JSON.parse(JSON.stringify(state.annotations)),
      translations: JSON.parse(JSON.stringify(state.translations)),
      tags: JSON.parse(JSON.stringify(currentTags())),
      showBilingual: state.showBilingual,
      updatedAt: state.updatedAt || Date.now(),
      revision: state.revision,
      savedAt: Date.now()
    };
    let ok = false;

    if (state.embedded) {
      ok = writeJSON(exportStorageKey(state.doc.id), record);
    } else {
      const list = readRecentDocs().filter((item) => item.doc.id !== state.doc.id);
      list.unshift(record);
      ok = writeRecentDocs(list);
      if (!ok) {
        list.splice(Math.max(1, list.length - 1), 1);
        ok = writeRecentDocs(list);
      }
    }

    if (pageImages.length && runtime.pageCacheSavedFor !== state.doc.id && runtime.pageCacheSavingFor !== state.doc.id) {
      runtime.pageCacheSavingFor = state.doc.id;
      saveCachedImages(state.doc.id, pageImages).then((saved) => {
        if (saved) runtime.pageCacheSavedFor = state.doc.id;
        if (runtime.pageCacheSavingFor === state.doc.id) runtime.pageCacheSavingFor = null;
      });
    }

    if (ok) {
      state.lastSaved = Date.now();
      updateSaveIndicator('已自动保存 · ' + formatClock(state.lastSaved), false);
    } else {
      updateSaveIndicator('当前浏览器无法写入本地存储', false);
      toast('本地存储空间不足，建议下载批注版 HTML 保存成果。', 'error', 6200);
    }
    return ok;
  }

  const schedulePersist = debounce(() => {
    persistNow();
  }, 520);

  function bump() {
    state.updatedAt = Date.now();
    state.revision += 1;
    updateSaveIndicator('正在保存…', true);
    schedulePersist();
  }

  function updateSaveIndicator(text, saving) {
    const el = $('.save-state');
    if (!el) return;
    el.classList.toggle('saving', Boolean(saving));
    const label = $('.save-label', el);
    if (label) label.textContent = text;
  }

  function removeRecent(id) {
    const list = readRecentDocs().filter((item) => item.doc.id !== id);
    writeRecentDocs(list);
    removeDocFromFolders(id);
    deleteCachedImages(id);
    try { localStorage.removeItem(exportStorageKey(id)); } catch (err) { /* noop */ }
  }

  async function loadRecent(id) {
    const list = readRecentDocs();
    const record = list.find((item) => item.doc.id === id);
    if (!record) {
      toast('没有找到这篇文献的本地记录。', 'error');
      return;
    }
    const liveImages = state.doc && state.doc.id === id && state.doc.pageImages && state.doc.pageImages.length
      ? state.doc.pageImages
      : null;
    const liveTags = state.doc && state.doc.id === id ? currentTags().slice() : null;
    if (hydrate(record)) {
      if (liveTags) state.tags = liveTags;
      if (!state.doc.pageImages || !state.doc.pageImages.length) {
        if (liveImages) {
          state.doc.pageImages = liveImages;
          runtime.pageCacheSavedFor = state.doc.id;
        } else {
          const cached = await loadCachedImages(state.doc.id);
          if (cached && cached.length) {
            state.doc.pageImages = cached;
            runtime.pageCacheSavedFor = state.doc.id;
          }
        }
      }
      state.embedded = false;
      state.view = 'workspace';
      render();
      toast('已恢复上次的批注与阅读记录。');
    }
  }

  /* ---------------------------------------------------------
     PDF extraction
     --------------------------------------------------------- */

  async function ensurePdfJs() {
    if (runtime.pdfjs) return runtime.pdfjs;
    if (runtime.pdfjsPromise) return runtime.pdfjsPromise;

    runtime.pdfjsPromise = (async () => {
      const srcNode = document.getElementById('pdfjs-source');
      const workerNode = document.getElementById('pdfworker-source');
      if (!srcNode || !workerNode || !srcNode.textContent.trim() || !workerNode.textContent.trim()) {
        throw new Error('PDF 解析引擎未内置到此文件。请使用原始工作台首页重新上传文献。');
      }
      const moduleBlob = new Blob([srcNode.textContent], { type: 'text/javascript' });
      const moduleUrl = URL.createObjectURL(moduleBlob);
      const lib = await import(moduleUrl);
      const workerBlob = new Blob([workerNode.textContent], { type: 'text/javascript' });
      lib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(workerBlob);
      runtime.pdfjs = lib;
      return lib;
    })();

    try {
      return await runtime.pdfjsPromise;
    } catch (err) {
      runtime.pdfjsPromise = null;
      throw err;
    }
  }

  function median(values) {
    if (!values.length) return 0;
    const arr = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
  }

  function weightedMedian(pairs) {
    if (!pairs.length) return 0;
    const sorted = pairs.slice().sort((a, b) => a.value - b.value);
    const total = sorted.reduce((sum, p) => sum + p.weight, 0);
    let acc = 0;
    for (let i = 0; i < sorted.length; i += 1) {
      acc += sorted[i].weight;
      if (acc >= total / 2) return sorted[i].value;
    }
    return sorted[sorted.length - 1].value;
  }

  function pageLinesFromItems(items, pageWidth, pageHeight, pageNumber) {
    const cleaned = [];
    items.forEach((item) => {
      if (!item || typeof item.str !== 'string') return;
      const str = item.str;
      if (!str || !str.trim()) return;
      const tr = item.transform || [1, 0, 0, 1, 0, 0];
      const fontSize = Math.max(1, Math.abs(item.height || 0) || Math.hypot(tr[2], tr[3]) || 10);
      cleaned.push({
        str,
        x: Number(tr[4]) || 0,
        y: Number(tr[5]) || 0,
        width: Number(item.width) || 0,
        fontSize,
        fontName: item.fontName || ''
      });
    });

    if (!cleaned.length) return [];

    cleaned.sort((a, b) => (b.y - a.y) || (a.x - b.x));

    const rows = [];
    cleaned.forEach((item) => {
      const tolerance = clamp(item.fontSize * 0.26, 1.5, 4.2);
      let target = null;
      for (let i = rows.length - 1; i >= 0; i -= 1) {
        if (Math.abs(rows[i].y - item.y) <= tolerance) {
          target = rows[i];
          break;
        }
        if (rows[i].y - item.y > tolerance * 2.5) break;
      }
      if (!target) {
        target = { y: item.y, items: [] };
        rows.push(target);
      }
      target.items.push(item);
      target.y = (target.y + item.y) / 2;
    });

    const lines = [];
    rows.forEach((row) => {
      const sorted = row.items.slice().sort((a, b) => a.x - b.x);
      let segment = null;
      sorted.forEach((item) => {
        const gapThreshold = Math.max(18, item.fontSize * 1.55);
        if (!segment || (item.x - segment.x1) > gapThreshold) {
          if (segment) lines.push(segment);
          segment = { items: [item], x0: item.x, x1: item.x + (item.width || 0), y: row.y };
        } else {
          segment.items.push(item);
          segment.x1 = Math.max(segment.x1, item.x + (item.width || 0));
        }
      });
      if (segment) lines.push(segment);
    });

    const built = lines.map((line) => {
      const itemsSorted = line.items.slice().sort((a, b) => a.x - b.x);
      let text = '';
      let prevEnd = null;
      let bold = false;
      let italic = false;
      let fontSize = 0;
      itemsSorted.forEach((item) => {
        if (text && prevEnd != null) {
          const gap = item.x - prevEnd;
          const needSpace = gap > Math.max(1.2, item.fontSize * 0.1);
          if (needSpace && !/\s$/.test(text) && !/^\s/.test(item.str)) text += ' ';
        }
        text += item.str;
        prevEnd = item.x + (item.width || 0);
        fontSize = Math.max(fontSize, item.fontSize);
        if (/bold|black|semibold|demi/i.test(item.fontName)) bold = true;
        if (/italic|oblique/i.test(item.fontName)) italic = true;
      });
      text = text.replace(/\s+/g, ' ').trim();
      return {
        text,
        x0: line.x0,
        x1: line.x1,
        y: line.y,
        fontSize: fontSize || 10,
        bold,
        italic,
        page: pageNumber,
        pageWidth,
        pageHeight,
        column: 0
      };
    }).filter((line) => line.text);

    return orderPageLines(built, pageWidth, pageHeight, pageNumber);
  }

  function orderPageLines(lines, pageWidth, pageHeight, pageNumber) {
    if (lines.length < 12) {
      lines.forEach((line) => { line.column = 0; });
      return lines.sort((a, b) => (b.y - a.y) || (a.x0 - b.x0));
    }

    const left = lines.filter((line) => line.x1 < pageWidth * 0.57 && line.x0 < pageWidth * 0.48);
    const right = lines.filter((line) => line.x0 > pageWidth * 0.442 && line.x1 > pageWidth * 0.54);
    const full = lines.filter((line) => !left.includes(line) && !right.includes(line));

    const rightSpan = right.length ? Math.max.apply(null, right.map((l) => l.y)) - Math.min.apply(null, right.map((l) => l.y)) : 0;
    const twoColumn = left.length >= 12 && right.length >= 12 && rightSpan > pageHeight * 0.42;

    if (!twoColumn) {
      lines.forEach((line) => { line.column = 0; });
      return lines.sort((a, b) => (b.y - a.y) || (a.x0 - b.x0));
    }

    const leftSorted = left.slice().sort((a, b) => b.y - a.y);
    const rightSorted = right.slice().sort((a, b) => b.y - a.y);
    leftSorted.forEach((line) => { line.column = 0; });
    rightSorted.forEach((line) => { line.column = 1; });
    const topY = Math.max(
      leftSorted.length ? leftSorted[0].y : -Infinity,
      rightSorted.length ? rightSorted[0].y : -Infinity
    );
    const topFull = full.filter((line) => line.y >= topY - 8).sort((a, b) => b.y - a.y);
    const bottomFull = full.filter((line) => line.y < topY - 8).sort((a, b) => b.y - a.y);
    topFull.forEach((line) => { line.column = 0; });
    bottomFull.forEach((line) => { line.column = 0; });
    return [].concat(topFull, leftSorted, rightSorted, bottomFull);
  }

  function cleanRunningHeads(pages) {
    const edgeLines = [];
    pages.forEach((page) => {
      page.lines.forEach((line) => {
        const nearTop = line.y > page.height * 0.925;
        const nearBottom = line.y < page.height * 0.075;
        if (nearTop || nearBottom) edgeLines.push({ line, page });
      });
    });

    const freq = new Map();
    edgeLines.forEach(({ line, page }) => {
      const key = normalizeForMatch(line.text);
      if (!key) return;
      if (!freq.has(key)) freq.set(key, new Set());
      freq.get(key).add(page.number);
    });

    const threshold = Math.max(2, Math.ceil(pages.length * 0.38));
    pages.forEach((page) => {
      page.lines = page.lines.filter((line) => {
        const nearEdge = line.y > page.height * 0.925 || line.y < page.height * 0.075;
        if (!nearEdge) return true;
        const key = normalizeForMatch(line.text);
        if (!key) return false;
        if (/^\d{1,3}$/.test(line.text.trim())) return false;
        if (/^\d{1,3}\s*$/.test(line.text)) return false;
        if (freq.get(key) && freq.get(key).size >= threshold) return false;
        if (line.text.length < 5 && line.y < page.height * 0.075) return false;
        return true;
      });
    });
  }

  /*
   * Elsevier-style first pages place ARTICLE INFO / Keywords in a narrow left
   * column and the Abstract in a wide right column on the same baselines. The
   * generic line ordering would interleave those two columns. Detect this local
   * header geometry and rebuild a clean abstract block before paragraph parsing.
   */
  function normalizeHeaderColumns(page) {
    if (!page || page.number !== 1) return;
    const lines = page.lines;
    if (!lines || lines.length < 8) return;
    const abstractLine = lines.find((line) => {
      const text = normalizeSpace(line.text);
      return /^(a\s*b\s*s\s*t\s*r\s*a\s*c\s*t|abstract)$/i.test(text) && line.x0 > page.width * 0.3;
    });
    if (!abstractLine) return;

    const introLine = lines.find((line) => line.y < abstractLine.y - 18 && /^(1\.?\s+)?introduction\b/i.test(normalizeSpace(line.text)));
    const bottomY = introLine ? introLine.y + 10 : abstractLine.y - page.height * 0.32;
    const rightLines = lines
      .filter((line) => line !== abstractLine && line.y <= abstractLine.y + 5 && line.y >= bottomY &&
        line.x0 >= abstractLine.x0 - 4 && line.x1 > page.width * 0.52 && line.text.length > 1)
      .sort((a, b) => b.y - a.y);
    if (rightLines.length < 3) return;

    const keywordLines = lines.filter((line) => line !== abstractLine && line.y <= abstractLine.y + 5 &&
      line.y >= bottomY && line.x0 < abstractLine.x0 - 20 && line.x0 < page.width * 0.38);
    const articleInfoLine = lines.find((line) => line !== abstractLine && Math.abs(line.y - abstractLine.y) < 5);

    page.keywordsText = keywordLines.map((line) => line.text).join('; ');
    page.abstractText = rightLines.map((line) => line.text).join(' ');
    page.headerColumn = true;

    const remove = new Set([abstractLine].concat(rightLines, keywordLines, articleInfoLine ? [articleInfoLine] : []));
    const kept = lines.filter((line) => !remove.has(line));
    const headingLine = Object.assign({}, abstractLine, {
      text: 'Abstract',
      x0: abstractLine.x0,
      x1: abstractLine.x1,
      synthetic: true
    });
    const textLine = Object.assign({}, rightLines[rightLines.length - 1], {
      text: rightLines.map((line) => line.text).join(' '),
      x0: Math.min.apply(null, rightLines.map((line) => line.x0)),
      x1: Math.max.apply(null, rightLines.map((line) => line.x1)),
      y: abstractLine.y - 10,
      fontSize: rightLines[0].fontSize,
      synthetic: true
    });
    kept.push(headingLine, textLine);
    page.lines = kept.sort((a, b) => (b.y - a.y) || (a.x0 - b.x0));
  }

  function extractAuthorsFromPage(page, title, bodySize) {
    if (!page || !page.lines || !title) return '';
    const titleKey = normalizeForMatch(title);
    const titleLines = page.lines.filter((line) => {
      const key = normalizeForMatch(line.text);
      return key.length > 8 && titleKey.includes(key.slice(0, 24));
    });
    if (!titleLines.length) return '';
    const bottom = Math.min.apply(null, titleLines.map((line) => line.y));
    const abstractLine = page.lines.find((line) => /^(a\s*b\s*s\s*t\s*r\s*a\s*c\s*t|abstract)$/i.test(normalizeSpace(line.text)) && line.y < bottom);
    const topBoundary = abstractLine ? abstractLine.y : bottom - page.height * 0.2;
    const authors = page.lines
      .filter((line) => line.y < bottom - 2 && line.y > topBoundary &&
        line.fontSize > bodySize * 1.08 && line.fontSize < 12.9 &&
        line.text.length > 4 && !/^[a-z]$/i.test(line.text.trim()))
      .sort((a, b) => b.y - a.y)
      .map((line) => line.text)
      .join(' ')
      .replace(/\s+([,;])/g, '$1')
      .replace(/\s*[∗*†‡]\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[,;]\s*$/, '')
      .trim();
    if (authors.length < 8 || authors.length > 420) return '';
    if (!/[A-Z][a-z]+\s+[A-Z]/.test(authors)) return '';
    return authors;
  }

  function computeBodyMetrics(pages) {
    const pairs = [];
    const xCounts = new Map();
    pages.forEach((page, pageIndex) => {
      page.lines.forEach((line) => {
        if (line.synthetic) return;
        if (line.text.length < 15) return;
        if (line.y > page.height * 0.9 || line.y < page.height * 0.1) return;
        pairs.push({ value: line.fontSize, weight: line.text.length });
        if (pageIndex > 0 || line.y < page.height * 0.8) {
          const key = Math.round(line.x0 / 4) * 4;
          xCounts.set(key, (xCounts.get(key) || 0) + 1);
        }
      });
    });
    let bodySize = weightedMedian(pairs) || 10;
    if (bodySize < 5 || bodySize > 20) bodySize = median(pairs.map((p) => p.value)) || 10;

    let baseX = 0;
    let max = 0;
    xCounts.forEach((count, x) => {
      if (count > max) { max = count; baseX = x; }
    });
    if (!baseX) {
      const xs = pages.flatMap((page) => page.lines.filter((l) => l.fontSize <= bodySize * 1.1).map((l) => l.x0));
      baseX = median(xs) || 54;
    }
    return { bodySize, baseX };
  }

  function isHeadingLine(line, bodySize) {
    const text = normalizeSpace(line.text);
    if (!text || text.length > 190) return false;
    if (/^(abstract|a\s*b\s*s\s*t\s*r\s*a\s*c\s*t)$/i.test(text)) return 'abstract';
    if (/^keywords?\s*[:：]/i.test(text) || /^key\s*words?\b/i.test(text)) return 'keywords';
    if (/^(references|bibliography|works cited|literature cited)$/i.test(text)) return 'references';
    if (/^(appendix|appendices)\b/i.test(text)) return 'heading';
    if (/^(acknowledg(e)?ments?|funding|credit authorship|declaration of competing|conflict of interest)\b/i.test(text)) return 'heading';
    if (/^\d{1,2}(\.\d{1,2}){0,3}\.?\s+[A-Z]/.test(text) && !/[.!?;]$/.test(text)) return 'heading';
    if (line.fontSize > bodySize * 1.16 && !/[.!?;]$/.test(text) && text.split(' ').length < 24) return 'heading';
    if (line.bold && line.fontSize >= bodySize * 0.94 && !/[.!?;]$/.test(text) && text.split(' ').length < 16) return 'heading';
    if (/^[A-Z][A-Z\s&:,-]{5,}$/.test(text) && text.split(' ').length < 12) return 'heading';
    return false;
  }

  function lineLooksLikeCaption(text) {
    const clean = normalizeSpace(text);
    if (!/^(fig(ure)?\.?|table)\s*[\dA-Z]/i.test(clean)) return false;
    if (clean.length < 12 || clean.length > 300) return false;
    if (/\b(reports?|shows?|presents?|illustrates?|summari[sz]es?|visuali[sz]es?)\b/i.test(clean)) return false;
    return true;
  }

  function joinBlockLines(lines) {
    let text = '';
    lines.forEach((line) => {
      let piece = normalizeSpace(line.text);
      if (!piece) return;
      if (!text) {
        text = piece;
        return;
      }
      if (/[\u2010-\u2015-]$/.test(text) && /^[a-z]/.test(piece)) {
        text = text.replace(/[\u2010-\u2015-]$/, '') + piece;
      } else if (/[\u2010-\u2015-]$/.test(text) && /^[A-Z0-9]/.test(piece)) {
        text = text.replace(/[\u2010-\u2015-]$/, '') + piece;
      } else {
        text += ' ' + piece;
      }
    });
    return normalizeSpace(text)
      .replace(/\s+([,.;:!?%])/g, '$1')
      .replace(/([(\[])\s+/g, '$1')
      .replace(/\s+([)\]])/g, '$1');
  }

  function buildBlocks(pages, bodySize) {
    const blocks = [];
    let current = null;
    let prevLine = null;

    function flush() {
      if (!current) return;
      const text = joinBlockLines(current.lines);
      if (text) {
        const firstLine = current.lines[0];
        blocks.push({
          type: 'paragraph',
          text,
          page: firstLine.page,
          fontSize: current.fontSize,
          bold: current.bold,
          x0: Math.min.apply(null, current.lines.map((l) => l.x0)),
          y: firstLine.y,
          lastY: current.lines[current.lines.length - 1].y,
          pageWidth: firstLine.pageWidth,
          pageHeight: firstLine.pageHeight
        });
      }
      current = null;
    }

    pages.forEach((page, pageIndex) => {
      page.lines.forEach((line) => {
        const headingKind = isHeadingLine(line, bodySize);
        if (headingKind) {
          flush();
          let type = 'heading';
          if (headingKind === 'abstract') type = 'abstract-heading';
          else if (headingKind === 'keywords') type = 'keywords';
          else if (headingKind === 'references') type = 'references-heading';
          blocks.push({
            type,
            text: normalizeSpace(line.text),
            page: page.number,
            fontSize: line.fontSize,
            bold: line.bold,
            x0: line.x0,
            y: line.y,
            pageWidth: line.pageWidth,
            pageHeight: line.pageHeight
          });
          prevLine = line;
          return;
        }

        if (lineLooksLikeCaption(line.text)) {
          flush();
          blocks.push({
            type: 'caption',
            text: normalizeSpace(line.text),
            page: page.number,
            fontSize: line.fontSize,
            bold: line.bold,
            x0: line.x0,
            y: line.y,
            pageWidth: line.pageWidth,
            pageHeight: line.pageHeight
          });
          prevLine = line;
          return;
        }

        let shouldBreak = false;
        if (current) {
          const last = current.lines[current.lines.length - 1];
          if (last.page !== line.page) shouldBreak = true;
          else if (last.column !== line.column) shouldBreak = true;
          else {
            const gap = last.y - line.y;
            const lineHeight = bodySize * 1.24;
            if (gap > lineHeight * 1.32) shouldBreak = true;
            if (Math.abs(line.fontSize - current.fontSize) > bodySize * 0.24) shouldBreak = true;
            const prevEndsSentence = /[.!?]["')\]]?$/.test(last.text) && !/[-\u2010-\u2015]$/.test(last.text);
            const indent = line.x0 - current.x0 > bodySize * 0.42;
            const prevShort = last.x1 < pageWidthForLine(last) - bodySize * 2.3;
            if (prevEndsSentence && (indent || prevShort) && gap > bodySize * 0.72) shouldBreak = true;
            if (/^(\[|\d+\.\s+[A-Z]|[•·-]\s)/.test(line.text) && prevEndsSentence) shouldBreak = true;
          }
        }

        if (!current || shouldBreak) {
          flush();
          current = {
            lines: [line],
            fontSize: line.fontSize,
            bold: line.bold,
            x0: line.x0
          };
        } else {
          current.lines.push(line);
          current.bold = current.bold || line.bold;
          current.fontSize = Math.max(current.fontSize, line.fontSize);
        }
        prevLine = line;
      });
      flush();
      if (pageIndex < pages.length - 1) prevLine = null;
    });

    // Merge paragraphs that were simply split by a page turn.
    for (let i = 1; i < blocks.length; i += 1) {
      const prev = blocks[i - 1];
      const cur = blocks[i];
      if (prev.type !== 'paragraph' || cur.type !== 'paragraph') continue;
      if (!prev.text || !cur.text) continue;
      if (!/[.!?]["')\]]?$/.test(prev.text) && cur.page === prev.page + 1) {
        prev.text = normalizeSpace(prev.text + ' ' + cur.text);
        blocks.splice(i, 1);
        i -= 1;
      }
    }

    return blocks;
  }

  function pageWidthForLine(line) {
    return line.pageWidth || 612;
  }

  function titleCaseReasonable(text) {
    return text && text.length > 3 && text.length < 500;
  }

  function cleanMetaTitle(raw) {
    let title = normalizeSpace(raw || '');
    if (!title) return '';
    if (/^(untitled|microsoft word|document\d*|paper\d*)/i.test(title)) return '';
    if (title.length > 360) title = title.slice(0, 360);
    return title;
  }

  function extractKeywords(rawText) {
    let text = normalizeSpace(rawText || '');
    text = text.replace(/^.*?keywords?\s*[:：]?\s*/i, '');
    if (!text) return [];
    let parts = text.split(/\s*[;；·]\s*|\s*,\s*/).map((s) => s.trim()).filter(Boolean);
    if (parts.length < 2) {
      parts = text.split(/\s{2,}/).map((s) => s.trim()).filter(Boolean);
    }
    return parts
      .map((s) => s.replace(/[.;]+$/, '').trim())
      .filter((s) => s.length > 1 && s.length < 56)
      .slice(0, 8);
  }

  function extractDocument(pages, pdfMeta, filename) {
    cleanRunningHeads(pages);
    pages.forEach((page) => normalizeHeaderColumns(page));
    const { bodySize, baseX } = computeBodyMetrics(pages);
    if (pages[0] && pages[0].lines) {
      pages[0].lines = pages[0].lines.filter((line) => {
        if (line.synthetic) return true;
        return !(line.y < pages[0].height * 0.2 && line.fontSize < bodySize * 0.92);
      });
    }
    const rawBlocks = buildBlocks(pages, bodySize);

    const info = (pdfMeta && pdfMeta.info) || {};
    const metaTitle = cleanMetaTitle(info.Title);
    const metaAuthor = normalizeSpace(info.Author || '');
    const metaSubject = normalizeSpace(info.Subject || '');

    let title = metaTitle;
    let titleIndex = -1;
    if (metaTitle) {
      const key = normalizeForMatch(metaTitle).slice(0, 70);
      titleIndex = rawBlocks.findIndex((block) => normalizeForMatch(block.text).startsWith(key.slice(0, 40)));
    }
    if (titleIndex < 0) {
      let best = -1;
      let bestScore = 0;
      rawBlocks.slice(0, 14).forEach((block, index) => {
        if (block.type !== 'heading' && block.type !== 'paragraph') return;
        const text = normalizeSpace(block.text);
        if (!titleCaseReasonable(text) || text.length < 14) return;
        if (block.page !== 1) return;
        if (/^(abstract|keywords?)\b/i.test(text)) return;
        const score = block.fontSize * 10 + Math.min(text.length, 100) / 8 - index * 0.6;
        if (score > bestScore) { bestScore = score; best = index; }
      });
      titleIndex = best;
      if (best >= 0) title = normalizeSpace(rawBlocks[best].text);
    }
    if (!title) title = cleanMetaTitle(filename.replace(/\.pdf$/i, '').replace(/[_]+/g, ' '));

    // Merge consecutive large type blocks for a wrapped title, if metadata did not supply it.
    if (titleIndex >= 0 && !metaTitle) {
      const base = rawBlocks[titleIndex];
      if (base.type === 'heading' || base.type === 'paragraph') {
        let j = titleIndex + 1;
        while (j < rawBlocks.length) {
          const nxt = rawBlocks[j];
          if (nxt.page !== 1) break;
          if (nxt.fontSize < base.fontSize * 0.9) break;
          if (/^(abstract|keywords?)\b/i.test(nxt.text)) break;
          if (nxt.text.length > 180) break;
          title += ' ' + nxt.text;
          rawBlocks.splice(j, 1);
        }
        title = normalizeSpace(title);
      }
    }

    let authors = metaAuthor;
    if (!authors && titleIndex >= 0) {
      for (let i = titleIndex + 1; i < Math.min(rawBlocks.length, titleIndex + 4); i += 1) {
        const block = rawBlocks[i];
        if (block.page !== 1) break;
        const text = normalizeSpace(block.text);
        if (!text || /^(abstract|keywords?)\b/i.test(text)) break;
        if (text.length < 260 && (/,/.test(text) || / and /i.test(text)) && !/[.!?]$/.test(text)) {
          authors = text;
          break;
        }
      }
    }
    const visibleAuthors = extractAuthorsFromPage(pages[0], title, bodySize);
    if (visibleAuthors && (!authors || visibleAuthors.length > authors.length + 4 || !/,/.test(authors))) {
      authors = visibleAuthors;
    }

    // Extract abstract from labelled region.
    let abstractText = '';
    let abstractIndex = -1;
    let abstractEnd = -1;
    for (let i = 0; i < rawBlocks.length; i += 1) {
      const block = rawBlocks[i];
      const text = normalizeSpace(block.text);
      const match = text.match(/^(?:a\s*b\s*s\s*t\s*r\s*a\s*c\s*t|abstract)\b[\s:.—-]*/i);
      if (!match) continue;
      if (block.page > 2) break;
      abstractIndex = i;
      abstractText = text.slice(match[0].length).trim();
      let j = i + 1;
      while (j < rawBlocks.length) {
        const nxt = rawBlocks[j];
        if (nxt.type !== 'paragraph') break;
        const nt = normalizeSpace(nxt.text);
        if (/^keywords?\b/i.test(nt)) break;
        abstractText += (abstractText ? ' ' : '') + nt;
        j += 1;
      }
      abstractEnd = j;
      break;
    }
    if (!abstractText && abstractIndex < 0) {
      const introIndex = rawBlocks.findIndex((block) => /^(1\.?\s+)?introduction\b/i.test(normalizeSpace(block.text)));
      const authorIndex = titleIndex + 1;
      if (introIndex > authorIndex + 1) {
        const candidate = rawBlocks.slice(authorIndex + 1, introIndex)
          .filter((b) => b.type === 'paragraph')
          .map((b) => b.text)
          .join(' ');
        if (candidate.length > 240) abstractText = candidate;
      }
    }

    // Keywords.
    let keywords = [];
    if (pages[0] && pages[0].keywordsText) {
      keywords = extractKeywords(pages[0].keywordsText);
    }
    if (!keywords.length) {
      for (let i = 0; i < rawBlocks.length; i += 1) {
        const block = rawBlocks[i];
        if (/keywords?\s*[:：]/i.test(block.text)) {
          keywords = extractKeywords(block.text);
          break;
        }
        if (block.type === 'keywords') {
          keywords = extractKeywords(block.text);
          break;
        }
      }
    }

    // Source / DOI.
    const pageOneText = (pages[0] ? pages[0].lines.map((l) => l.text).join(' ') : '');
    const allFrontText = pages.slice(0, 2).map((p) => p.lines.map((l) => l.text).join(' ')).join(' ');
    const doiMatch = allFrontText.match(/\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/i);
    const doi = doiMatch ? doiMatch[0].replace(/[.,;]$/, '') : '';
    let source = metaSubject;
    const journalMatch = pageOneText.match(/([A-Z][A-Za-z&:\s]{8,85}?)\s+(\d{1,3})\s*\((20\d{2})\)\s*(\d{3,})/);
    if (journalMatch) {
      source = normalizeSpace(journalMatch[1]) + ' · ' + journalMatch[2] + ' (' + journalMatch[3] + ')';
    }
    if (!source) {
      const candidates = [metaSubject, info.Keywords, info.Creator].filter(Boolean);
      source = normalizeSpace(candidates[0] || '');
    }
    source = normalizeSpace(source
      .replace(/\s*[.;]?\s*doi\s*:\s*\S+.*$/i, '')
      .replace(/\s*[.;]\s*$/, ''));
    const yearMatch = (source + ' ' + pageOneText).match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : '';

    // Determine where the body begins.
    let bodyStart = 0;
    if (abstractIndex >= 0) bodyStart = abstractEnd >= 0 ? abstractEnd : abstractIndex + 1;
    else {
      const introIndex = rawBlocks.findIndex((block) => /^(1\.?\s+)?introduction\b/i.test(normalizeSpace(block.text)));
      bodyStart = introIndex >= 0 ? introIndex : Math.max(0, titleIndex + 1);
    }

    // Skip metadata blocks after the abstract until the actual introduction/heading.
    while (bodyStart < rawBlocks.length) {
      const block = rawBlocks[bodyStart];
      const text = normalizeSpace(block.text);
      if (!text) { bodyStart += 1; continue; }
      if (block.type === 'abstract-heading' || block.type === 'keywords' || /^keywords?\b/i.test(text)) {
        bodyStart += 1;
        continue;
      }
      if (/^(article info|a\s*b\s*s\s*t\s*r\s*a\s*c\s*t)\b/i.test(text)) {
        bodyStart += 1;
        continue;
      }
      break;
    }

    const blocks = [];
    let inReferences = false;
    for (let i = bodyStart; i < rawBlocks.length; i += 1) {
      const raw = rawBlocks[i];
      const text = normalizeSpace(raw.text);
      if (!text) continue;
      if (raw === rawBlocks[titleIndex] && !metaTitle) continue;
      if (authors && normalizeForMatch(text) === normalizeForMatch(authors)) continue;
      if (raw.type === 'abstract-heading') continue;
      if (raw.type === 'keywords') continue;

      if (raw.type === 'references-heading' || /^(references|bibliography|works cited)\b/i.test(text)) {
        inReferences = true;
        blocks.push({ type: 'h2', text, page: raw.page, y: raw.y, lastY: raw.lastY, pageWidth: raw.pageWidth, pageHeight: raw.pageHeight });
        continue;
      }

      if (raw.type === 'heading') {
        const clean = normalizeSpace(text);
        if (!clean) continue;
        if (/^[A-Z]{2}(\s+[A-Z]{2})+$/.test(clean)) continue;
        if (/^(\d{1,2}(\.\d{1,2}){0,3}\.?)\s+/.test(clean)) {
          const depthMatch = clean.match(/^(\d{1,2}(?:\.\d{1,2}){0,3})\.?\s+/);
          const depth = depthMatch ? depthMatch[1].split('.').length : 1;
          const tag = 'h' + Math.min(5, Math.max(2, depth + 1));
          blocks.push({ type: tag, text: clean, page: raw.page, y: raw.y, lastY: raw.lastY, pageWidth: raw.pageWidth, pageHeight: raw.pageHeight });
        } else {
          blocks.push({ type: 'h2', text: clean, page: raw.page, y: raw.y, lastY: raw.lastY, pageWidth: raw.pageWidth, pageHeight: raw.pageHeight });
        }
        continue;
      }

      if (inReferences) {
        blocks.push({ type: 'ref', text, page: raw.page, y: raw.y, lastY: raw.lastY, pageWidth: raw.pageWidth, pageHeight: raw.pageHeight });
        continue;
      }

      if (lineLooksLikeCaption(text)) {
        blocks.push({ type: 'caption', text, page: raw.page, y: raw.y, lastY: raw.lastY, pageWidth: raw.pageWidth, pageHeight: raw.pageHeight });
      } else {
        blocks.push({ type: 'p', text, page: raw.page, y: raw.y, lastY: raw.lastY, pageWidth: raw.pageWidth, pageHeight: raw.pageHeight });
      }
    }

    const cleanBlocks = [];
    const seen = new Set();
    blocks.forEach((block) => {
      const key = block.type + '|' + normalizeForMatch(block.text);
      if (!block.text || seen.has(key)) return;
      seen.add(key);
      cleanBlocks.push(block);
    });

    const tablePages = new Set(blocks
      .filter((block) => block.type === 'caption' && /^table/i.test(block.text))
      .map((block) => block.page));
    const readableBlocks = cleanBlocks.filter((block) => !(block.type === 'p' && tablePages.has(block.page) && looksLikeTableNoise(block.text)));

    if (readableBlocks.length && readableBlocks[0].type === 'h2' && /^abstract$/i.test(readableBlocks[0].text)) {
      readableBlocks.shift();
    }

    const trimmedBlocks = trimAtConclusion(readableBlocks);
    const lastPage = trimmedBlocks.reduce((max, block) => Math.max(max, Number(block.page) || 1), 1);

    const doc = {
      id: 'doc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7),
      title,
      authors,
      abstract: normalizeSpace(abstractText),
      keywords,
      source,
      doi,
      year,
      pageCount: Math.max(1, lastPage),
      blocks: trimmedBlocks,
      wordCount: countWords([title, authors, abstractText].concat(trimmedBlocks.map((b) => b.text)).join(' ')),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      originalName: filename || '',
      isDemo: false
    };

    return doc;
  }

  function looksLikeTableNoise(text) {
    const clean = normalizeSpace(text);
    if (!clean) return true;
    const digitCount = (clean.match(/\d/g) || []).length;
    const ratio = digitCount / Math.max(1, clean.length);
    const lowerWords = (clean.match(/\b[a-z]{4,}\b/g) || []).length;
    const percentages = (clean.match(/%/g) || []).length;
    const sentenceEnd = /[.!?]["')\]]?$/.test(clean);
    if (clean.length < 5) return true;
    if (clean.length < 40 && lowerWords < 4) return true;
    if (/\*{2,}|<\.\d|>\.\d/.test(clean)) return true;
    if (ratio > 0.1) return true;
    if (percentages > 2 && !(sentenceEnd && lowerWords > 18)) return true;
    if (/^(unfamiliar|familiar|extremely familiar|very familiar|slightly familiar|moderately familiar|not familiar)\b/i.test(clean)) return true;
    if (/percentages rounded|values?\s*<\s*0\.5%/i.test(clean)) return true;
    if (/^(variable|construct|fit indices|correlations|total%|note:|source:|au\s+sp\s+us)\b/i.test(clean)) return true;
    if (/^(associate degree|primary education|ai familiarity|education|gender|age)\b/i.test(clean) && !sentenceEnd) return true;
    if (!sentenceEnd && clean.length < 260 && lowerWords < 20) return true;
    return false;
  }

  function addEmbeddedFigurePreviews(blocks) {
    const out = [];
    const existing = new Set(blocks
      .filter((block) => block.type === 'caption')
      .map((block) => normalizeForMatch(block.text)));
    blocks.forEach((block) => {
      out.push(block);
      if (block.type !== 'p' || !block.page) return;
      const match = normalizeSpace(block.text).match(/((?:Table|Fig(?:ure)?\.?)\s*[A-Z]?\d+\.?\s+[A-Z][^.!?]{6,180}\.)\s*$/);
      if (!match) return;
      const caption = normalizeSpace(match[1]);
      const key = normalizeForMatch(caption);
      if (!key || existing.has(key)) return;
      existing.add(key);
      out.push({
        type: 'figure-preview',
        text: caption,
        page: block.page,
        y: block.lastY || block.y,
        pageWidth: block.pageWidth,
        pageHeight: block.pageHeight
      });
    });
    return out;
  }

  function trimAtConclusion(blocks) {
    if (!blocks.length) return blocks;
    let cut = blocks.length;

    const conclusionIndex = blocks.findIndex((block) => {
      if (!/^h[2-5]$/.test(block.type)) return false;
      const text = normalizeSpace(block.text);
      return text.length < 100 && /\bconclusions?\b/i.test(text);
    });

    if (conclusionIndex >= 0) {
      cut = blocks.length;
      for (let i = conclusionIndex + 1; i < blocks.length; i += 1) {
        const block = blocks[i];
        if (block.type !== 'h2') continue;
        const text = normalizeSpace(block.text);
        if (/^6(?:\.\d+)*\.?\s/.test(text) || /^6\.?$/.test(text)) continue;
        cut = i;
        break;
      }
    }

    const referencesIndex = blocks.findIndex((block) => /^(references|bibliography|works cited|literature cited)\b/i.test(normalizeSpace(block.text)));
    if (referencesIndex >= 0) cut = Math.min(cut, referencesIndex);
    return blocks.slice(0, Math.max(1, cut));
  }

  async function parsePdfFile(file, onProgress) {
    const lib = await ensurePdfJs();
    const buffer = new Uint8Array(await file.arrayBuffer());
    const loadingTask = lib.getDocument({
      data: buffer,
      isEvalSupported: false,
      useSystemFonts: true
    });

    if (onProgress) onProgress({ ratio: 0.03, label: '正在打开 PDF', detail: '准备逐页提取文字…' });
    const pdf = await loadingTask.promise;
    const meta = await pdf.getMetadata().catch(() => ({}));
      const total = pdf.numPages;
      const pages = [];
      const pageImages = [];

    for (let pageNo = 1; pageNo <= total; pageNo += 1) {
      if (onProgress) {
        onProgress({
          ratio: 0.05 + (pageNo / total) * 0.88,
          label: '正在提取文字',
          detail: '第 ' + pageNo + ' / ' + total + ' 页'
        });
      }
      const page = await pdf.getPage(pageNo);
      const viewport = page.getViewport({ scale: 1 });
      const content = await page.getTextContent({
        includeMarkedContent: false,
        disableNormalization: false
      });
      const lines = pageLinesFromItems(content.items, viewport.width, viewport.height, pageNo);
      pages.push({
        number: pageNo,
        width: viewport.width,
        height: viewport.height,
        lines
      });

      // Render a compact page image so figures, tables and formulas remain
      // visible in their original layout. Text extraction still drives reading.
      try {
        const targetWidth = total > 40 ? 780 : 920;
        const imageScale = Math.min(1.65, targetWidth / viewport.width);
        const imageViewport = page.getViewport({ scale: imageScale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(imageViewport.width);
        canvas.height = Math.round(imageViewport.height);
        const ctx = canvas.getContext('2d', { alpha: false });
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: imageViewport, intent: 'display' }).promise;
        const dataUrl = canvas.toDataURL('image/jpeg', total > 40 ? 0.62 : 0.7);
        if (dataUrl && dataUrl.length > 80) {
          pageImages.push({
            page: pageNo,
            dataUrl,
            width: canvas.width,
            height: canvas.height
          });
        }
        canvas.width = 1;
        canvas.height = 1;
      } catch (imageError) {
        // Pages with unusual vector or font content can still be read as text.
      }
      try { page.cleanup(); } catch (err) { /* noop */ }
      await sleep(pageNo % 2 === 0 ? 0 : 6);
    }

    if (onProgress) onProgress({ ratio: 0.92, label: '正在重建版式', detail: '识别标题、段落与章节结构…' });
    const doc = extractDocument(pages, meta, file.name);
    doc.originalName = file.name;
    doc.originalSize = file.size;
    doc.pageImages = pageImages.filter((image) => Number(image.page) <= Number(doc.pageCount));

    if (!doc.blocks.length || countWords(doc.abstract + ' ' + doc.blocks.map((b) => b.text).join(' ')) < 40) {
      throw new Error('没有从这份 PDF 中提取到足够的可读文字。它可能是扫描版文献，或文字被保护、转为曲线。');
    }

    if (onProgress) onProgress({ ratio: 1, label: '解析完成', detail: '共 ' + total + ' 页 · ' + doc.wordCount + ' 词' });
    try { await pdf.destroy(); } catch (err) { /* noop */ }
    return doc;
  }

  /* ---------------------------------------------------------
     Demo document
     --------------------------------------------------------- */

  function loadDemo() {
    const data = window.__WENLAN_DEMO__;
    if (!data || !data.doc) {
      toast('示例文献数据未载入。', 'error');
      return;
    }
    const existing = readRecentDocs().find((item) => item.doc.id === data.doc.id);
    if (existing) {
      if (hydrate(existing)) {
        state.embedded = false;
        state.view = 'workspace';
        render();
        toast('已打开示例文献（含上次批注）。');
      }
      return;
    }

    const doc = JSON.parse(JSON.stringify(data.doc));
    doc.createdAt = Date.now();
    doc.updatedAt = Date.now();
    doc.id = data.doc.id || uid('demo');
    state.doc = doc;
    state.annotations = [];
    state.translations = {};
    state.tags = DEFAULT_TAGS.slice();
    state.showBilingual = false;
    state.showOriginal = false;
    state.embedded = false;
    state.revision = 1;
    state.updatedAt = Date.now();
    state.activeAnnId = null;
    state.editor = null;
    prepareDoc(doc, state.translations);

    if (Array.isArray(data.annotations)) {
      data.annotations.forEach((seed, index) => {
        const target = findSentenceByQuote(seed.quote);
        if (!target) return;
        const ann = {
          id: 'ann_demo_' + index,
          sid: target.sid,
          quote: target.text,
          range: rangeForSentence(target),
          translation: seed.translation || state.translations[target.sid] || '',
          note: seed.note || '',
          color: seed.color || 'ochre',
          tag: seed.tag || '',
          createdAt: Date.now() - (10 - index) * 60000,
          updatedAt: Date.now()
        };
        state.annotations.push(ann);
        if (ann.tag && !state.tags.includes(ann.tag)) state.tags.push(ann.tag);
        if (ann.translation) state.translations[target.sid] = ann.translation;
      });
    }

    recalcAnnotationMaps();
    state.view = 'workspace';
    render();
    persistNow();
    toast('示例文献已展开。点击任意句子，即可开始批注。');
  }

  function findSentenceByQuote(quote) {
    const target = normalizeForMatch(quote);
    if (!target) return null;
    let best = null;
    let bestScore = 0;
    runtime.sentences.forEach((sentence) => {
      const key = normalizeForMatch(sentence.text);
      if (!key) return;
      if (key === target) {
        best = sentence;
        bestScore = 1000;
        return;
      }
      if (key.includes(target) || target.includes(key)) {
        const score = Math.min(key.length, target.length);
        if (score > bestScore) { bestScore = score; best = sentence; }
      }
    });
    return best;
  }

  /* ---------------------------------------------------------
     Translation providers
     --------------------------------------------------------- */

  async function fetchWithTimeout(url, options, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs || 22000);
    try {
      const response = await fetch(url, Object.assign({}, options, { signal: controller.signal }));
      return response;
    } finally {
      clearTimeout(timer);
    }
  }

  async function translateGoogle(text) {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=' + encodeURIComponent(text);
    const response = await fetchWithTimeout(url, { method: 'GET', mode: 'cors' }, 18000);
    if (!response.ok) throw new Error('Google 翻译返回 ' + response.status);
    const data = await response.json();
    if (!Array.isArray(data) || !Array.isArray(data[0])) throw new Error('Google 翻译返回格式异常');
    const result = data[0].map((part) => (part && part[0]) || '').join('').trim();
    if (!result) throw new Error('Google 翻译没有返回内容');
    return result;
  }

  async function translateMyMemory(text) {
    if (text.length > 470) {
      const chunks = splitForTranslation(text, 440);
      const pieces = [];
      for (const chunk of chunks) pieces.push(await translateMyMemory(chunk));
      return pieces.join('');
    }
    const query = text;
    const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(query) + '&langpair=en%7Czh-CN';
    const response = await fetchWithTimeout(url, { method: 'GET', mode: 'cors' }, 18000);
    if (!response.ok) throw new Error('MyMemory 返回 ' + response.status);
    const data = await response.json();
    const result = data && data.responseData && data.responseData.translatedText;
    if (!result) throw new Error('MyMemory 没有返回内容');
    if (/MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(result)) throw new Error('MyMemory 请求额度已用完');
    return String(result).trim();
  }

  async function translateBuiltin(text) {
    const TranslatorApi = window.Translator;
    if (!TranslatorApi || typeof TranslatorApi.create !== 'function') {
      throw new Error('当前浏览器不支持内置翻译');
    }
    const targets = ['zh', 'zh-Hans'];
    let lastError = null;
    for (const targetLanguage of targets) {
      try {
        if (typeof TranslatorApi.availability === 'function') {
          const availability = await TranslatorApi.availability({ sourceLanguage: 'en', targetLanguage });
          if (availability === 'unavailable' || availability === 'downloadable') {
            if (availability === 'downloadable') {
              // Creating the translator may trigger an on-device model download.
            }
          }
        }
        const translator = await TranslatorApi.create({
          sourceLanguage: 'en',
          targetLanguage,
          monitor(m) {
            if (m && typeof m.addEventListener === 'function') {
              m.addEventListener('downloadprogress', function () { /* model download */ });
            }
          }
        });
        const result = await translator.translate(text);
        if (result) return String(result).trim();
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError || new Error('浏览器内置翻译不可用');
  }

  function normalizeEndpoint(endpoint) {
    let url = String(endpoint || '').trim();
    if (!url) throw new Error('还没有填写 API 地址');
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    if (/\/v1\/?$/.test(url)) url += '/chat/completions';
    return url;
  }

  function parseLLMJson(content) {
    const raw = String(content || '').trim();
    if (!raw) throw new Error('大模型返回为空');
    let text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    try {
      return JSON.parse(text);
    } catch (err) {
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start >= 0 && end > start) {
        return JSON.parse(text.slice(start, end + 1));
      }
      throw new Error('大模型没有返回可解析的 JSON');
    }
  }

  async function translateLLM(items, cfg) {
    const endpoint = normalizeEndpoint(cfg.endpoint);
    const model = String(cfg.model || '').trim();
    if (!model) throw new Error('还没有填写模型名称');
    const isOllama = cfg.provider === 'ollama';
    if (!isOllama && !cfg.apiKey) throw new Error('还没有填写 API Key');
    const body = {
      model,
      temperature: 0.15,
      messages: [
        {
          role: 'system',
          content: '你是一位专业的学术文献翻译。把用户给出的英文文献句子逐句译成准确、克制、可发表的中文。要求：保留专业术语的准确性与一致性；保留原文中的引用编号、数字、模型符号；不增删信息，不作解释。只输出 JSON 对象，格式为 {"translations":[{"id":"句子id","zh":"中文译文"}]}。'
        },
        {
          role: 'user',
          content: JSON.stringify({ sentences: items.map((item) => ({ id: item.id, en: item.text })) })
        }
      ],
      stream: false
    };
    const headers = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers.Authorization = 'Bearer ' + cfg.apiKey;
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(body)
    }, 45000);
    if (!response.ok) {
      let detail = '';
      try { detail = (await response.text()).slice(0, 240); } catch (err) { /* noop */ }
      throw new Error('翻译接口返回 ' + response.status + (detail ? '：' + detail : ''));
    }
    const data = await response.json();
    const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content) throw new Error('翻译接口没有返回 content');
    const parsed = parseLLMJson(content);
    const list = parsed && Array.isArray(parsed.translations) ? parsed.translations : null;
    if (!list) throw new Error('翻译接口返回的 JSON 结构不正确');
    const map = new Map();
    list.forEach((row) => {
      if (row && row.id && row.zh) map.set(String(row.id), String(row.zh).trim());
    });
    return map;
  }

  function providerLabel(provider) {
    const labels = {
      auto: '自动选择',
      google: 'Google 翻译',
      mymemory: 'MyMemory',
      builtin: '浏览器内置翻译',
      llm: '大模型 API',
      ollama: 'Ollama 本地模型'
    };
    return labels[provider] || provider;
  }

  async function translateText(text, cfgOverride) {
    const cfg = cfgOverride || currentSettings();
    const provider = cfg.provider || 'auto';
    const clean = normalizeSpace(text);
    if (!clean) throw new Error('没有可翻译的文本');
    if (clean.length > 2200) {
      const chunks = splitForTranslation(clean, 1800);
      const pieces = [];
      for (const chunk of chunks) pieces.push(await translateText(chunk, cfg));
      return pieces.join('');
    }

    if (provider === 'llm' || provider === 'ollama') {
      const map = await translateLLM([{ id: 'one', text: clean }], cfg);
      if (!map.get('one')) throw new Error('大模型没有返回这句的译文');
      return map.get('one');
    }

    if (provider === 'google') return translateGoogle(clean);
    if (provider === 'mymemory') return translateMyMemory(clean);
    if (provider === 'builtin') return translateBuiltin(clean);

    // auto: MyMemory is reachable from more networks (including mainland China);
    // Google is the quality fallback when MyMemory's quota is exhausted.
    const errors = [];
    try { return await translateMyMemory(clean); } catch (err) { errors.push('MyMemory：' + err.message); }
    try { return await translateGoogle(clean); } catch (err) { errors.push('Google：' + err.message); }
    try { return await translateBuiltin(clean); } catch (err) { errors.push('内置：' + err.message); }
    throw new Error(errors.join('；') || '翻译服务暂时不可用');
  }

  function splitForTranslation(text, limit) {
    const chunks = [];
    let rest = text;
    while (rest.length > limit) {
      let cut = rest.lastIndexOf('. ', limit);
      if (cut < limit * 0.5) cut = rest.lastIndexOf('; ', limit);
      if (cut < limit * 0.5) cut = rest.lastIndexOf(' ', limit);
      if (cut < 1) cut = limit;
      chunks.push(rest.slice(0, cut + 1));
      rest = rest.slice(cut + 1).trim();
    }
    if (rest) chunks.push(rest);
    return chunks;
  }

  async function translateBatchLLM(items, cfg, onProgress, isCancelled) {
    const out = new Map();
    const errors = [];
    const chunkSize = 8;
    for (let i = 0; i < items.length; i += chunkSize) {
      if (isCancelled && isCancelled()) break;
      const chunk = items.slice(i, i + chunkSize);
      try {
        const map = await translateLLM(chunk, cfg);
        chunk.forEach((item) => {
          const zh = map.get(item.id);
          if (zh) out.set(item.id, zh);
          else errors.push(item.id);
        });
      } catch (err) {
        chunk.forEach((item) => errors.push(item.id + '：' + err.message));
      }
      if (onProgress) onProgress(i + chunk.length, items.length);
      await sleep(100);
    }
    return { translations: out, errors };
  }

  async function translateBatchFree(items, cfg, onProgress, isCancelled) {
    const out = new Map();
    const errors = [];
    let nextIndex = 0;
    let done = 0;
    const concurrency = 2;

    async function worker() {
      while (true) {
        if (isCancelled && isCancelled()) return;
        const index = nextIndex;
        nextIndex += 1;
        if (index >= items.length) return;
        const item = items[index];
        try {
          const zh = await translateText(item.text, cfg);
          if (zh) out.set(item.id, zh);
          else errors.push(item.id);
        } catch (err) {
          errors.push(item.id + '：' + err.message);
        }
        done += 1;
        if (onProgress) onProgress(done, items.length);
        await sleep(130);
      }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
    return { translations: out, errors };
  }

  /* ---------------------------------------------------------
     Rendering — top bar & home
     --------------------------------------------------------- */

  function saveIndicatorHTML() {
    if (!state.doc || state.view === 'home') {
      const label = state.embedded ? '离线批注版 · 已内嵌' : 'PDF 本地解析';
      return '<span class="topbar-meta"><span class="eyebrow no-rule" style="font-size:8.5px;letter-spacing:.13em">' + label + '</span></span>';
    }
    return '<div class="topbar-meta"><span class="save-state"><span class="save-dot"></span><span class="save-label">' +
      escapeHTML(state.lastSaved ? '已自动保存 · ' + formatClock(state.lastSaved) : '自动保存已开启') +
      '</span></span></div>';
  }

  function topbarHTML(view) {
    const hasDoc = Boolean(state.doc);
    return '<header class="topbar">' +
      '<button class="brand" data-action="go-home" aria-label="返回首页">' +
        '<span class="brand-seal">文</span>' +
        '<span class="brand-word"><b>文澜</b><small>阅读批注工作台</small></span>' +
      '</button>' +
      '<nav class="topnav" aria-label="主导航">' +
        '<button class="nav-link ' + (view === 'home' ? 'is-active' : '') + '" data-action="go-home">首页</button>' +
        '<button class="nav-link ' + (view === 'workspace' ? 'is-active' : '') + '" data-action="go-workspace" ' + (hasDoc ? '' : 'disabled') + '>工作区</button>' +
      '</nav>' +
      '<span class="topbar-spacer"></span>' +
      saveIndicatorHTML() +
      '<button class="icon-btn" data-action="open-settings" title="翻译与服务设置" aria-label="翻译设置">' + icon('settings') + '</button>' +
    '</header>';
  }

  function render() {
    if (state.view === 'workspace' && state.doc) {
      renderWorkspace();
    } else {
      renderHome();
    }
    document.title = state.doc && state.view === 'workspace'
      ? state.doc.title + ' · 文澜批注'
      : '文澜 · 英文文献批注工作台';
    window.scrollTo(0, 0);
  }

  function renderHome() {
    const embedded = state.embedded;
    const hasDoc = Boolean(state.doc);
    const recent = embedded ? [] : readRecentDocs();
    const titleLine = embedded ? '阅读有迹，' : '让每一次阅读，';
    const titleEm = embedded ? '批注有声。' : '都留下可追溯的思考。';
    const lede = embedded
      ? '这是一份可独立打开的批注版文献。左侧是原文，右侧是你留下的译文与批注；点击“继续阅读”回到工作区，所有痕迹都会留在原处。'
      : '上传一篇英文文献，自动重建段落、逐句翻译、边读边注。批注跟随文稿保存，也可以导出成一份可以独立打开、继续阅读的 HTML。';

    app.innerHTML = topbarHTML('home') +
      '<main class="home">' +
        '<div class="home-inner">' +
          '<section class="home-hero">' +
            '<div class="hero-copy">' +
              '<div class="hero-kicker"><span></span>文献阅读 · 批注 · 留存</div>' +
              '<h1 class="hero-title">' + escapeHTML(titleLine) + '<br><em>' + escapeHTML(titleEm) + '</em></h1>' +
              '<p class="hero-lede">' + escapeHTML(lede) + '</p>' +
              '<div class="hero-seal">细读<br>留痕</div>' +
            '</div>' +
            (embedded ? exportCoverHTML() : uploadCardHTML()) +
          '</section>' +
          (embedded ? exportStepsHTML() : standardStepsHTML()) +
          (embedded ? '' : libraryHTML(recent)) +
          '<footer class="home-footer">' +
            '<span>文澜 · 为慢读而作</span>' +
            '<span class="footer-quote">“页边余白，正是思考开始的地方。”</span>' +
          '</footer>' +
        '</div>' +
      '</main>';

    if (!embedded && !hasDoc) {
      // Home remains a clean entry point; a saved document is opened from recents.
    }
    bindHomePaste();
  }

  function uploadCardHTML() {
    return '<div class="upload-card">' +
      '<div class="dropzone" id="dropzone" data-action="pick-file" tabindex="0" role="button" aria-label="上传英文文献 PDF">' +
        '<div class="upload-glyph">' + icon('pdf') + '</div>' +
        '<h3>放入一篇英文文献</h3>' +
        '<p class="drop-note">拖拽 PDF 到此，或点击选择文件<br>逐页提取文字 · 不上传服务器</p>' +
        '<button class="btn btn-primary" type="button" data-action="pick-file">选择 PDF 文件</button>' +
        '<input type="file" id="fileInput" accept="application/pdf,.pdf" class="visually-hidden">' +
      '</div>' +
      '<div class="upload-foot">' +
        '<button class="text-link" data-action="load-sample">先看看示例文献 →</button>' +
        '<span>PDF · 建议 40 MB 以内</span>' +
      '</div>' +
    '</div>';
  }

  function exportCoverHTML() {
    const annCount = state.annotations.length;
    const transCount = Object.keys(state.translations).length;
    return '<div class="upload-card">' +
      '<div class="export-card">' +
        '<div>' +
          '<div class="doc-sigil">批</div>' +
          '<h3>' + escapeHTML(state.doc ? displayNameOf(state.doc) : '批注版文献') + '</h3>' +
          '<div class="export-meta">' + escapeHTML(state.doc ? (state.doc.authors || state.doc.source || '') : '') + '</div>' +
          '<div class="export-stat">' +
            '<div><b>' + annCount + '</b><span>条批注</span></div>' +
            '<div><b>' + transCount + '</b><span>句译文</span></div>' +
            '<div><b>' + (state.doc ? state.doc.pageCount : 0) + '</b><span>页原文</span></div>' +
          '</div>' +
          '<div class="export-actions">' +
            '<button class="btn btn-primary" data-action="go-workspace">继续阅读 ' + icon('arrow') + '</button>' +
            '<button class="btn" data-action="download-html">' + icon('download') + ' 下载新版</button>' +
          '</div>' +
        '</div>' +
        '<p class="drop-note" style="margin:20px 0 0;color:var(--muted);font-size:9.5px;line-height:1.8">此文件内嵌原文与批注数据。若在本浏览器中继续编辑，最新改动会自动保存在本机，重新下载即可把更新写入文件。</p>' +
      '</div>' +
    '</div>';
  }

  function standardStepsHTML() {
    return '<section class="home-editorial">' +
      '<div class="editorial-quote">' +
        '<span class="quote-opening">“</span>' +
        '<p>阅读不是把书翻完，<br>而是让一句话在心里停久一点。</p>' +
        '<span class="quote-credit">文澜 · 使用小记</span>' +
      '</div>' +
      '<div class="editorial-workflow">' +
        '<div class="editorial-workflow-head"><span>阅读的三个动作</span><b></b></div>' +
        '<div class="editorial-step"><span class="editorial-no">01</span><div><h4>放进来</h4><p>上传一篇 PDF，自动重建标题、摘要与段落，图表保留原页。</p></div></div>' +
        '<div class="editorial-step"><span class="editorial-no">02</span><div><h4>读进去</h4><p>逐句翻译、划出重点，在页边写下判断、证据与待讨论的问题。</p></div></div>' +
        '<div class="editorial-step"><span class="editorial-no">03</span><div><h4>带得走</h4><p>导出一份独立 HTML，原文、译文、批注与标记颜色一并留存。</p></div></div>' +
      '</div>' +
    '</section>';
  }

  function exportStepsHTML() {
    return '<div class="home-steps">' +
      '<div class="home-step"><span class="step-no">01</span><div><h4>原文完整保留</h4><p>版式重建后的英文原文，可在左侧逐句点击。</p></div></div>' +
      '<div class="home-step"><span class="step-no">02</span><div><h4>批注随文保存</h4><p>原文、译文、批注和标记配色都已内嵌在此文件中。</p></div></div>' +
      '<div class="home-step"><span class="step-no">03</span><div><h4>继续写下去</h4><p>在浏览器里继续编辑后，重新下载即可生成新版本。</p></div></div>' +
    '</div>';
  }

  function libraryCardHTML(record, folderId) {
    const doc = record.doc || {};
    const annCount = Array.isArray(record.annotations) ? record.annotations.length : 0;
    return '<div class="recent-card library-doc" data-action="open-recent" data-id="' + escapeAttr(doc.id) + '" data-doc-id="' + escapeAttr(doc.id) + '" draggable="true" tabindex="0" role="button">' +
      '<div class="recent-top"><span>' + escapeHTML(doc.year || 'PDF') + ' · ' + escapeHTML(doc.pageCount || '—') + ' 页</span>' +
      '<span class="ann-total">' + icon('pen') + ' ' + annCount + '</span></div>' +
      '<div class="doc-card-actions">' +
        '<button class="mini-btn" data-action="edit-doc-name" data-id="' + escapeAttr(doc.id) + '" title="修改显示名称" aria-label="修改文献名称">' + icon('pen') + '</button>' +
        '<button class="mini-btn" data-action="move-doc" data-id="' + escapeAttr(doc.id) + '" title="移动到其他文献夹" aria-label="移动文献">' + icon('folder') + '</button>' +
        '<button class="mini-btn danger" data-action="delete-doc" data-id="' + escapeAttr(doc.id) + '" title="删除这篇文献" aria-label="删除文献">' + icon('trash') + '</button>' +
      '</div>' +
      '<h3>' + escapeHTML(displayNameOf(doc)) + '</h3>' +
      '<div class="recent-meta">' + escapeHTML(shortText(doc.authors || doc.source || '本地文献', 90)) + '<br>' + formatDate(record.updatedAt) + '</div>' +
      '<span class="recent-foot">继续阅读 →</span>' +
    '</div>';
  }

  function librarySectionHTML(title, subtitle, folderId, docs, options) {
    const isUnfiled = folderId === '';
    const folder = isUnfiled ? null : readFolders().find((item) => item.id === folderId);
    return '<section class="library-folder ' + (isUnfiled ? 'unfiled-folder' : '') + '" data-folder-id="' + escapeAttr(folderId) + '">' +
      '<div class="folder-head">' +
        '<div class="folder-title">' +
          '<span class="folder-glyph">' + icon(isUnfiled ? 'layers' : 'folder') + '</span>' +
          '<div><h3>' + escapeHTML(title) + '</h3><p>' + escapeHTML(subtitle) + '</p></div>' +
          '<span class="folder-count">' + docs.length + ' 篇</span>' +
        '</div>' +
        (folder ? '<div class="folder-actions">' +
          '<button class="mini-btn" data-action="rename-folder" data-id="' + escapeAttr(folder.id) + '" title="重命名文献夹">' + icon('pen') + '</button>' +
          '<button class="mini-btn danger" data-action="delete-folder" data-id="' + escapeAttr(folder.id) + '" title="删除文献夹">' + icon('trash') + '</button>' +
        '</div>' : '') +
      '</div>' +
      (docs.length
        ? '<div class="recent-grid library-grid">' + docs.map((record) => libraryCardHTML(record, folderId)).join('') + '</div>'
        : '<div class="folder-empty">' + (isUnfiled ? '还没有未归类文献。' : '这个文献夹还是空的，可以把文献拖动到这里，或点击卡片上的文件夹按钮移动进来。') + '</div>') +
    '</section>';
  }

  function libraryHTML(recent) {
    const folders = readFolders();
    const docsById = new Map(recent.map((record) => [record.doc.id, record]));
    const assigned = new Set();
    folders.forEach((folder) => {
      folder.docIds = folder.docIds.filter((id) => docsById.has(id));
      folder.docIds.forEach((id) => assigned.add(id));
    });
    const unfiled = recent.filter((record) => !assigned.has(record.doc.id));
    const totalFolders = folders.length;

    let body = '';
    folders.forEach((folder) => {
      const docs = folder.docIds.map((id) => docsById.get(id)).filter(Boolean);
      body += librarySectionHTML(folder.name, '文献夹', folder.id, docs);
    });
    if (recent.length || folders.length) {
      body += librarySectionHTML('未归类', '尚未放入文献夹的文献', '', unfiled);
    }
    if (!recent.length && !folders.length) {
      body = '<div class="library-empty">' +
        '<div class="library-empty-glyph">' + icon('book') + '</div>' +
        '<h3>建立你的第一组文献</h3>' +
        '<p>先上传一篇 PDF，或新建一个文献夹，把不同主题的文献分组管理。</p>' +
        '<div><button class="btn btn-primary btn-sm" data-action="pick-file">上传第一条文献</button><button class="btn btn-sm" data-action="new-folder">新建文献夹</button></div>' +
      '</div>';
    }

    const folderChips = folders.map((folder) => {
      const count = folder.docIds.filter((id) => docsById.has(id)).length;
      return '<button class="folder-chip" data-action="scroll-folder" data-folder="' + escapeAttr(folder.id) + '"><span>' + escapeHTML(folder.name) + '</span><b>' + count + '</b></button>';
    }).join('');

    return '<section class="library-section">' +
      '<div class="library-head">' +
        '<div><h2>我的文献库</h2><p>按主题、课程或阅读计划建立文献夹，拖动文献卡片即可归类。</p></div>' +
        '<div class="library-actions">' +
          '<button class="btn btn-sm" data-action="new-folder">' + icon('folder') + ' 新建文献夹</button>' +
          '<button class="btn btn-sm btn-primary" data-action="pick-file">' + icon('upload') + ' 上传 PDF</button>' +
        '</div>' +
      '</div>' +
      '<div class="library-stats">' +
        '<span><b>' + recent.length + '</b> 篇文献</span><span><b>' + totalFolders + '</b> 个文献夹</span>' +
        '<span class="library-stats-note">拖动文献卡片可以快速归类</span>' +
        (recent.length ? '<button class="recent-clear" data-action="clear-recents">清空全部本地记录</button>' : '') +
      '</div>' +
      (folderChips ? '<div class="library-index">' + folderChips + '</div>' : '') +
      body +
    '</section>';
  }

  function bindLibraryDnD() {
    document.querySelectorAll('.library-doc').forEach((card) => {
      card.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', card.dataset.docId);
        event.dataTransfer.effectAllowed = 'move';
        card.classList.add('is-dragging');
      });
      card.addEventListener('dragend', () => card.classList.remove('is-dragging'));
    });
    document.querySelectorAll('.library-folder').forEach((zone) => {
      zone.addEventListener('dragover', (event) => {
        if (!event.dataTransfer || !Array.from(event.dataTransfer.types || []).includes('text/plain')) return;
        event.preventDefault();
        zone.classList.add('drop-target');
      });
      zone.addEventListener('dragleave', (event) => {
        if (!zone.contains(event.relatedTarget)) zone.classList.remove('drop-target');
      });
      zone.addEventListener('drop', (event) => {
        event.preventDefault();
        zone.classList.remove('drop-target');
        const docId = event.dataTransfer.getData('text/plain');
        if (docId) moveDocToFolder(docId, zone.dataset.folderId || '');
      });
    });
  }

  function bindHomePaste() {
    bindLibraryDnD();
  }

  function openFolderDialog(mode, folderId) {
    const folder = folderId ? readFolders().find((item) => item.id === folderId) : null;
    const isRename = mode === 'rename' && folder;
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" style="max-width:430px" role="dialog" aria-modal="true" data-stop="1">' +
      '<div class="modal-header"><div><h2>' + (isRename ? '重命名文献夹' : '新建文献夹') + '</h2><p>用主题、课程或阅读计划来命名，方便把多篇文献放在一起。</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-body"><div class="field"><label>文献夹名称</label><input type="text" id="folderNameInput" maxlength="40" value="' + escapeAttr(isRename ? folder.name : '') + '" placeholder="例如：主题阅读 · 理论背景"></div></div>' +
      '<div class="modal-foot"><button class="btn btn-sm" data-action="close-modal">取消</button><button class="btn btn-sm btn-primary" data-action="save-folder" data-mode="' + (isRename ? 'rename' : 'new') + '" data-id="' + escapeAttr(folder ? folder.id : '') + '">' + (isRename ? '保存名称' : '建立文献夹') + '</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
    setTimeout(() => {
      const input = document.getElementById('folderNameInput');
      if (input) { input.focus(); input.select(); }
    }, 100);
  }

  function saveFolderDialog(el) {
    const input = document.getElementById('folderNameInput');
    const name = normalizeSpace(input ? input.value : '').slice(0, 40);
    if (!name) {
      toast('请给文献夹起一个名字。', 'error');
      if (input) input.focus();
      return;
    }
    const folders = readFolders();
    const mode = el.dataset.mode;
    const id = el.dataset.id;
    if (mode === 'rename') {
      const folder = folders.find((item) => item.id === id);
      if (!folder) return;
      folder.name = name;
    } else {
      if (folders.some((folder) => normalizeForMatch(folder.name) === normalizeForMatch(name))) {
        toast('已经有一个同名文献夹。', 'error');
        return;
      }
      folders.push({ id: uid('folder'), name, docIds: [], createdAt: Date.now() });
    }
    writeFolders(folders);
    closeModal();
    if (state.view === 'home') renderHome();
    toast(mode === 'rename' ? '文献夹名称已更新。' : '文献夹「' + name + '」已建立。');
  }

  function openMoveDialog(docId) {
    const record = readRecentDocs().find((item) => item.doc.id === docId);
    if (!record) return;
    const folders = readFolders();
    const current = folderForDoc(docId, folders);
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" style="max-width:460px" role="dialog" aria-modal="true" data-stop="1">' +
      '<div class="modal-header"><div><h2>移动文献</h2><p>' + escapeHTML(shortText(displayNameOf(record.doc), 90)) + '</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-body">' +
        '<div class="move-list">' +
          '<button class="move-option ' + (!current ? 'is-current' : '') + '" data-action="move-doc-to" data-id="' + escapeAttr(docId) + '" data-folder="">' +
            '<span class="move-option-icon">' + icon('layers') + '</span><span><b>未归类</b><small>不放入任何文献夹</small></span>' + (!current ? '<em>当前位置</em>' : '') +
          '</button>' +
          folders.map((folder) => '<button class="move-option ' + (current && current.id === folder.id ? 'is-current' : '') + '" data-action="move-doc-to" data-id="' + escapeAttr(docId) + '" data-folder="' + escapeAttr(folder.id) + '">' +
            '<span class="move-option-icon">' + icon('folder') + '</span><span><b>' + escapeHTML(folder.name) + '</b><small>' + folder.docIds.length + ' 篇文献</small></span>' + (current && current.id === folder.id ? '<em>当前位置</em>' : '') +
          '</button>').join('') +
        '</div>' +
        (folders.length ? '' : '<p class="help" style="margin:14px 0 0;color:var(--muted);font-size:10px">还没有文献夹，可以先新建一个。</p>') +
      '</div>' +
      '<div class="modal-foot"><button class="btn btn-sm" data-action="close-modal">取消</button><button class="btn btn-sm" data-action="new-folder">新建文献夹</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
  }

  function openDocNameDialog(docId) {
    const record = readRecentDocs().find((item) => item.doc.id === docId);
    if (!record) return;
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" style="max-width:450px" role="dialog" aria-modal="true" data-stop="1">' +
      '<div class="modal-header"><div><h2>修改文献名称</h2><p>只改变文献库和导出的显示名称，不改变 PDF 内的论文标题。</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-body"><div class="field"><label>显示名称 <small>默认为 PDF 文件名</small></label><input type="text" id="docNameInput" maxlength="120" value="' + escapeAttr(displayNameOf(record.doc)) + '" placeholder="给这篇文献一个便于查找的名字"></div></div>' +
      '<div class="modal-foot"><button class="btn btn-sm" data-action="close-modal">取消</button><button class="btn btn-sm btn-primary" data-action="save-doc-name" data-id="' + escapeAttr(docId) + '">保存名称</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
    setTimeout(() => {
      const input = document.getElementById('docNameInput');
      if (input) { input.focus(); input.select(); }
    }, 100);
  }

  function saveDocNameDialog(el) {
    const input = document.getElementById('docNameInput');
    const name = normalizeSpace(input ? input.value : '').slice(0, 120);
    if (!name) {
      toast('名称不能为空。', 'error');
      if (input) input.focus();
      return;
    }
    const docs = readRecentDocs();
    const record = docs.find((item) => item.doc.id === el.dataset.id);
    if (!record) return;
    record.doc.displayName = name;
    record.updatedAt = Date.now();
    writeRecentDocs(docs);
    if (state.doc && state.doc.id === record.doc.id) state.doc.displayName = name;
    closeModal();
    if (state.view === 'home') renderHome();
    toast('文献名称已更新。');
  }

  function moveDocToFolder(docId, folderId) {
    if (!docId) return;
    const folders = readFolders();
    folders.forEach((folder) => {
      folder.docIds = folder.docIds.filter((id) => id !== docId);
    });
    if (folderId) {
      const target = folders.find((folder) => folder.id === folderId);
      if (target && !target.docIds.includes(docId)) target.docIds.push(docId);
    }
    writeFolders(folders);
    closeModal();
    if (state.view === 'home') renderHome();
    toast(folderId ? '文献已移动。' : '文献已移入未归类。');
  }

  function deleteDocFromLibrary(docId) {
    const record = readRecentDocs().find((item) => item.doc.id === docId);
    if (!record) return;
    confirmDialog({
      title: '删除这篇文献？',
      message: '“' + shortText(displayNameOf(record.doc), 72) + '”的译文与批注会一起从本地移除；已经下载的批注版 HTML 不受影响。',
      confirmLabel: '删除文献',
      danger: true
    }).then((ok) => {
      if (!ok) return;
      const wasCurrent = state.doc && state.doc.id === docId;
      removeRecent(docId);
      if (wasCurrent) {
        state.doc = null;
        state.annotations = [];
        state.translations = {};
        state.editor = null;
        state.view = 'home';
      }
      renderHome();
      toast('文献已删除。');
    });
  }

  function deleteFolderById(folderId) {
    const folders = readFolders();
    const folder = folders.find((item) => item.id === folderId);
    if (!folder) return;
    confirmDialog({
      title: '删除文献夹？',
      message: '“' + folder.name + '”中的 ' + folder.docIds.length + ' 篇文献不会被删除，它们会回到“未归类”。',
      confirmLabel: '删除文献夹',
      danger: true
    }).then((ok) => {
      if (!ok) return;
      writeFolders(folders.filter((item) => item.id !== folderId));
      renderHome();
      toast('文献夹已删除，文献已移入未归类。');
    });
  }

  function scrollToFolder(folderId) {
    const target = Array.from(document.querySelectorAll('.library-folder')).find((el) => el.dataset.folderId === folderId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('folder-flash');
      setTimeout(() => target.classList.remove('folder-flash'), 900);
    }
  }

  /* ---------------------------------------------------------
     Rendering — workspace & paper
     --------------------------------------------------------- */

  function renderWorkspace() {
    if (!state.doc) {
      state.view = 'home';
      renderHome();
      return;
    }
    hideSelectionMenu();
    const doc = state.doc;
    const annCount = state.annotations.length;
    app.innerHTML = topbarHTML('workspace') +
      '<main class="workspace ' + (state.tocOpen ? 'toc-open' : '') + '" id="workspace">' +
        '<div class="doc-pane">' +
          '<div class="doc-toolbar">' +
            '<div class="doc-crumbs">' +
              '<button data-action="go-home">首页</button><span>/</span><span class="current">' + escapeHTML(shortText(displayNameOf(doc), 72)) + '</span>' +
            '</div>' +
            '<div class="zoom-control" role="group" aria-label="调整文献显示区域">' +
              '<button data-action="zoom-out" title="缩小文献区域" aria-label="缩小文献区域">−</button>' +
              '<button class="zoom-value" data-action="zoom-reset" title="恢复 100%">' + Math.round(state.zoom * 100) + '%</button>' +
              '<button data-action="zoom-in" title="放大文献区域" aria-label="放大文献区域">+</button>' +
            '</div>' +
            '<div class="doc-tools">' +
              (doc.pageImages && doc.pageImages.length ? '<button class="btn btn-sm original-toggle ' + (state.showOriginal ? 'is-on' : '') + '" data-action="toggle-original" title="查看 PDF 原页中的图表与公式">' + icon('book') + '<span class="btn-label">' + (state.showOriginal ? '阅读版' : '原页') + '</span></button>' : '') +
              '<button class="btn btn-sm bilingual-toggle ' + (state.showBilingual ? 'is-on' : '') + '" data-action="toggle-bilingual" title="显示已生成的逐句译文">' + icon('translate') + '<span class="btn-label">双语对照</span></button>' +
              '<button class="btn btn-sm" data-action="open-translate-modal">' + icon('layers') + '<span class="btn-label">翻译文献</span></button>' +
              '<button class="btn btn-sm btn-primary" data-action="download-html">' + icon('download') + '<span class="btn-label">下载批注版</span></button>' +
            '</div>' +
          '</div>' +
          '<div class="doc-scroll" id="docScroll" tabindex="0" aria-label="文献正文，可使用滚轮或方向键滚动">' +
            '<div class="paper-shell"><article class="paper ' + (state.showBilingual ? 'is-bilingual' : '') + '" id="paper"></article></div>' +
          '</div>' +
          '<button class="toc-toggle" data-action="toggle-toc" title="展开目录" aria-label="展开文献目录"><span>目录</span></button>' +
          '<aside class="toc-panel" id="tocPanel" aria-label="文献目录">' +
            '<div class="toc-head"><div><h3>目录</h3></div><button class="icon-btn" data-action="close-toc" aria-label="收起目录">' + icon('close') + '</button></div>' +
            '<nav class="toc-list" id="tocList">' + tocHTML() + '</nav>' +
          '</aside>' +
          '<div class="reading-progress"><span id="readingProgress"></span></div>' +
        '</div>' +
        '<div class="margin-scrim" data-action="close-margin"></div>' +
        '<aside class="margin-pane" aria-label="批注面板">' +
          '<div class="margin-resizer" id="marginResizer" title="拖动调整批注栏宽度，双击恢复默认" role="separator" aria-orientation="vertical"></div>' +
          '<header class="margin-header">' +
            '<div><div class="eyebrow">页边批注</div><h2>批注</h2></div>' +
            '<div class="margin-head-meta">' +
              '<div class="ann-counter"><b id="annCounter">' + annCount + '</b><span>条</span></div>' +
              '<button class="margin-close" data-action="close-margin" title="收起批注" aria-label="收起批注">' + icon('close') + '</button>' +
            '</div>' +
          '</header>' +
          '<div class="margin-controls">' +
            '<label class="margin-search">' + icon('search') +
              '<input type="search" id="annSearch" placeholder="搜索原文、译文或批注" value="' + escapeAttr(state.query) + '" autocomplete="off">' +
            '</label>' +
            '<select class="margin-filter" id="annFilter" aria-label="按标签筛选">' +
              '<option value="all"' + (state.filter === 'all' ? ' selected' : '') + '>全部标签</option>' +
              '<option value="__untagged"' + (state.filter === '__untagged' ? ' selected' : '') + '>未分类</option>' +
              currentTags().map((tag) => '<option value="' + escapeAttr(tag) + '"' + (state.filter === tag ? ' selected' : '') + '>' + escapeHTML(tag) + '</option>').join('') +
            '</select>' +
            '<button class="tag-manage-btn" data-action="manage-tags" title="管理归类标签" aria-label="管理归类标签">#</button>' +
          '</div>' +
          '<div class="margin-scroll" id="marginScroll">' +
            '<div id="annotationList"></div>' +
          '</div>' +
          '<footer class="margin-footer"><span><span class="dot"></span> 点击左侧句子即可批注</span><span>自动保存</span></footer>' +
        '</aside>' +
        '<button class="mobile-margin-btn" data-action="open-margin">' + icon('pen') + ' 批注 <span id="mobileAnnCount">' + annCount + '</span></button>' +
      '</main>';

    renderPaperHTML();
    renderAnnotationList();
    bindWorkspaceEvents();
    applyMarginWidth();
    bindMarginResizer();
    requestAnimationFrame(() => {
      const scroll = document.getElementById('docScroll');
      if (scroll) {
        scroll.scrollTop = state.scrollTop || 0;
        updateReadingProgress();
        if (state.tocOpen) updateTocActive();
        scheduleMarginSync();
      }
    });
  }

  function renderPaperHTML() {
    const paper = document.getElementById('paper');
    if (!paper) return;
    applyPaperZoom();
    const doc = state.doc;
    if (state.showOriginal && doc.pageImages && doc.pageImages.length) {
      renderOriginalPaper(paper);
      return;
    }
    const firstPage = doc.blocks.length ? doc.blocks[0].page : 1;
    let lastPage = firstPage || 1;

    const blocksHTML = doc.blocks.map((block, index) => {
      let pageMark = '';
      if (doc.pageCount > 1 && block.page && block.page !== lastPage && (block.type === 'h2' || block.type === 'p')) {
        pageMark = '<div class="page-break"><span>第 ' + String(block.page).padStart(2, '0') + ' 页</span></div>';
        lastPage = block.page;
      }
      if (block.page) lastPage = block.page;
      return pageMark + renderBlock(block, index);
    }).join('');

    paper.className = 'paper' + (state.showBilingual ? ' is-bilingual' : '');
    paper.innerHTML =
      '<header class="paper-header">' +
        '<div class="paper-kicker">' + escapeHTML((doc.year ? doc.year + ' · ' : '') + '阅读批注本') + '</div>' +
        '<h1 class="paper-title">' + (runtime.byBlock.get(-2) ? renderSentenceGroup(doc.title, -2) : escapeHTML(doc.title || '未命名文献')) + '</h1>' +
        (doc.authors ? '<p class="paper-authors">' + (runtime.byBlock.get(-3) ? renderSentenceGroup(doc.authors, -3) : escapeHTML(doc.authors)) + '</p>' : '') +
        (sourceTextOf(doc) ? '<p class="paper-source">' + (runtime.byBlock.get(-4) ? renderSentenceGroup(sourceTextOf(doc), -4) : escapeHTML(sourceTextOf(doc))) + '</p>' : '') +
        (doc.abstract ? '<section class="abstract-block"><span class="abstract-label">摘要</span><div class="body-text">' + renderSentenceGroup(doc.abstract, -1) + '</div></section>' : '') +
        (doc.keywords && doc.keywords.length ? renderKeywordsHTML(doc) : '') +
      '</header>' +
      '<div class="paper-body">' + blocksHTML + '</div>' +
      '<footer class="paper-foot"><span>文澜 · 阅读批注本</span><span>' + escapeHTML(doc.originalName || '') + '</span></footer>';

  }

  function renderKeywordsHTML(doc) {
    const list = runtime.byBlock.get(-5) || [];
    if (!list.length) {
      return '<div class="keywords"><b>关键词</b>' + doc.keywords.map((k) => '<span class="keyword-chip">' + escapeHTML(k) + '</span>').join('') + '</div>';
    }
    return '<div class="keywords"><b>关键词</b>' +
      list.map((sentence) => sentenceHTML(sentence, 'keyword-chip')).join('') +
    '</div>';
  }

  function tocHTML() {
    const entries = [{ level: 0, label: state.doc.title, block: -1 }];
    state.doc.blocks.forEach((block, index) => {
      if (/^h[2-5]$/.test(block.type)) {
        entries.push({
          level: Number(block.type.slice(1)) - 1,
          label: block.text,
          block: index
        });
      }
    });
    return entries.map((entry) => '<button class="toc-item toc-level-' + Math.min(4, entry.level) + '" data-action="goto-heading" data-block="' + entry.block + '">' +
      '<span class="toc-item-text">' + escapeHTML(entry.label) + '</span></button>').join('');
  }

  function toggleToc(force) {
    const workspace = document.getElementById('workspace');
    if (!workspace) return;
    state.tocOpen = typeof force === 'boolean' ? force : !state.tocOpen;
    workspace.classList.toggle('toc-open', state.tocOpen);
    const button = document.querySelector('.toc-toggle');
    if (button) button.title = state.tocOpen ? '收起目录' : '展开目录';
    if (state.tocOpen) updateTocActive();
    setTimeout(applyPaperZoom, 330);
  }

  function goToHeading(blockIndex) {
    const index = Number(blockIndex);
    if (state.showOriginal) setOriginalMode(false);
    const scroll = document.getElementById('docScroll');
    if (index < 0) {
      if (scroll) scroll.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector('.block[data-block="' + index + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    $$('.toc-item').forEach((item) => item.classList.toggle('is-active', Number(item.dataset.block) === index));
    if (window.innerWidth <= 980) toggleToc(false);
  }

  function updateTocActive() {
    if (!state.tocOpen) return;
    const scroll = document.getElementById('docScroll');
    if (!scroll) return;
    const headings = $$('.block[data-block]').filter((el) => /^H[2-5]$/.test(el.tagName));
    const scrollRect = scroll.getBoundingClientRect();
    let active = -1;
    headings.forEach((heading) => {
      const top = heading.getBoundingClientRect().top - scrollRect.top;
      if (top <= 150) active = Number(heading.dataset.block);
    });
    if (scroll.scrollTop < 120) active = -1;
    $$('.toc-item').forEach((item) => item.classList.toggle('is-active', Number(item.dataset.block) === active));
    const activeItem = document.querySelector('.toc-item.is-active');
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest' });
  }

  function renderOriginalPaper(paper) {
    const images = state.doc.pageImages || [];
    paper.className = 'paper is-original';
    paper.innerHTML =
      '<div class="original-head">' +
        '<div class="eyebrow no-rule">PDF 原页</div>' +
        '<h2>原页对照</h2>' +
        '<p>图表、公式、表格与版式均按 PDF 原貌呈现。切回“阅读版”可继续逐句批注。</p>' +
      '</div>' +
      '<div class="original-pages">' +
        images.map((image) => '<figure class="original-page" data-page="' + image.page + '">' +
          '<button class="original-page-btn" data-action="zoom-page" data-page="' + image.page + '" title="放大原页">' +
            '<img src="' + image.dataUrl + '" alt="PDF 第 ' + image.page + ' 页" loading="lazy" decoding="async" width="' + image.width + '" height="' + image.height + '">' +
          '</button>' +
          '<figcaption><span>第 ' + String(image.page).padStart(2, '0') + ' 页</span><span>点击放大</span></figcaption>' +
        '</figure>').join('') +
      '</div>';
  }

  function applyMarginWidth() {
    const workspace = document.getElementById('workspace');
    if (!workspace) return;
    if (!state.marginWidth) {
      workspace.style.removeProperty('--margin-width');
      return;
    }
    const max = Math.max(340, Math.min(680, window.innerWidth - 460));
    const width = clamp(state.marginWidth, 320, max);
    workspace.style.setProperty('--margin-width', width + 'px');
  }

  function bindMarginResizer() {
    const resizer = document.getElementById('marginResizer');
    const workspace = document.getElementById('workspace');
    const pane = document.querySelector('.margin-pane');
    if (!resizer || !workspace || !pane) return;

    resizer.addEventListener('pointerdown', (event) => {
      if (window.innerWidth <= 980) return;
      event.preventDefault();
      const startX = event.clientX;
      const startWidth = pane.getBoundingClientRect().width;
      resizer.classList.add('is-dragging');
      try { resizer.setPointerCapture(event.pointerId); } catch (err) { /* noop */ }
      const max = Math.max(340, Math.min(680, window.innerWidth - 460));

      const onMove = (moveEvent) => {
        const next = clamp(startWidth - (moveEvent.clientX - startX), 320, max);
        state.marginWidth = Math.round(next);
        workspace.style.setProperty('--margin-width', state.marginWidth + 'px');
        requestAnimationFrame(applyPaperZoom);
      };
      const onUp = () => {
        resizer.classList.remove('is-dragging');
        resizer.removeEventListener('pointermove', onMove);
        resizer.removeEventListener('pointerup', onUp);
        resizer.removeEventListener('pointercancel', onUp);
        applyPaperZoom();
        saveLayout();
      };
      resizer.addEventListener('pointermove', onMove);
      resizer.addEventListener('pointerup', onUp);
      resizer.addEventListener('pointercancel', onUp);
    });

    resizer.addEventListener('dblclick', () => {
      state.marginWidth = 0;
      applyMarginWidth();
      saveLayout();
    });
  }

  function applyPaperZoom() {
    const paper = document.getElementById('paper');
    if (!paper) return;
    const shell = paper.parentElement;
    const baseWidth = shell ? shell.clientWidth : 850;
    paper.style.width = Math.max(320, baseWidth) + 'px';
    paper.style.zoom = state.zoom;
  }

  function saveLayout() {
    writeJSON('wenlan.layout.v1', { zoom: state.zoom, marginWidth: state.marginWidth });
  }

  function setZoom(value) {
    state.zoom = clamp(Math.round(value * 100) / 100, 0.7, 2.2);
    const paper = document.getElementById('paper');
    if (paper) paper.style.setProperty('--reader-zoom', state.zoom);
    applyPaperZoom();
    const valueEl = document.querySelector('.zoom-value');
    if (valueEl) valueEl.textContent = Math.round(state.zoom * 100) + '%';
    saveLayout();
  }

  function currentReadingPage() {
    const scroll = document.getElementById('docScroll');
    if (!scroll || !state.doc) return 1;
    const rect = scroll.getBoundingClientRect();
    let page = 1;
    const blocks = scroll.querySelectorAll('.block[data-block]');
    for (let i = 0; i < blocks.length; i += 1) {
      const top = blocks[i].getBoundingClientRect().top - rect.top;
      if (top > 150) break;
      const index = Number(blocks[i].dataset.block);
      const block = state.doc.blocks[index];
      if (block && block.page) page = block.page;
    }
    return page;
  }

  function currentOriginalPage() {
    const scroll = document.getElementById('docScroll');
    if (!scroll) return 1;
    const rect = scroll.getBoundingClientRect();
    let page = 1;
    scroll.querySelectorAll('.original-page').forEach((el) => {
      if (el.getBoundingClientRect().top - rect.top <= 140) {
        page = Number(el.dataset.page) || page;
      }
    });
    return page;
  }

  function scrollToReadingPage(page) {
    const scroll = document.getElementById('docScroll');
    if (!scroll) return;
    const index = state.doc.blocks.findIndex((block) => Number(block.page) >= Number(page));
    if (index < 0) {
      scroll.scrollTop = 0;
      return;
    }
    const target = scroll.querySelector('.block[data-block="' + index + '"]');
    if (target) {
      const delta = target.getBoundingClientRect().top - scroll.getBoundingClientRect().top;
      scroll.scrollTop = Math.max(0, scroll.scrollTop + delta - 20);
    }
  }

  function scrollToOriginalPage(page) {
    const scroll = document.getElementById('docScroll');
    if (!scroll) return;
    const target = scroll.querySelector('.original-page[data-page="' + Number(page) + '"]');
    if (target) {
      const delta = target.getBoundingClientRect().top - scroll.getBoundingClientRect().top;
      scroll.scrollTop = Math.max(0, scroll.scrollTop + delta - 16);
    }
  }

  function setOriginalMode(enabled) {
    if (!state.doc || !state.doc.pageImages || !state.doc.pageImages.length) return;
    const next = Boolean(enabled);
    const targetPage = next ? currentReadingPage() : currentOriginalPage();
    state.showOriginal = next;
    hideSelectionMenu();
    renderPaperHTML();
    const toggle = document.querySelector('.original-toggle');
    if (toggle) {
      toggle.classList.toggle('is-on', state.showOriginal);
      const label = toggle.querySelector('.btn-label');
      if (label) label.textContent = state.showOriginal ? '阅读版' : '原页';
      toggle.title = state.showOriginal ? '返回逐句阅读与批注' : '查看 PDF 原页中的图表与公式';
    }
    requestAnimationFrame(() => {
      if (state.showOriginal) scrollToOriginalPage(targetPage);
      else scrollToReadingPage(targetPage);
      updateReadingProgress();
    });
  }

  function openPageImage(pageNumber) {
    const image = (state.doc && state.doc.pageImages || []).find((item) => Number(item.page) === Number(pageNumber));
    if (!image) return;
    overlays.innerHTML = '<div class="overlay image-viewer" data-action="close-modal">' +
      '<div class="image-sheet" data-stop="1">' +
        '<div class="image-sheet-bar"><span>PDF 原页 · 第 ' + String(image.page).padStart(2, '0') + ' 页</span><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
        '<div class="image-sheet-scroll"><img src="' + image.dataUrl + '" alt="PDF 第 ' + image.page + ' 页"></div>' +
      '</div>' +
    '</div>';
    document.body.classList.add('has-overlay');
  }

  function figurePreviewHTML(block) {
    const images = state.doc.pageImages || [];
    const image = images.find((item) => Number(item.page) === Number(block.page));
    if (!image || !block.y || !block.pageHeight) return '';
    const W = image.width;
    const H = image.height;
    const pageHeight = block.pageHeight || 792;
    const pageWidth = block.pageWidth || 612;
    const scale = W / pageWidth;
    const captionTop = (pageHeight - block.y) * scale;
    const isTable = /^table/i.test(block.text);
    const siblings = (state.doc.blocks || []).filter((item) => item !== block &&
      Number(item.page) === Number(block.page) && Number.isFinite(Number(item.y)) &&
      item.type !== 'caption' && item.type !== 'figure-preview' && item.text && item.text.length > 16);
    let cropTop;
    let cropHeight;
    if (isTable) {
      // Use the position of the next real text block as the lower boundary of
      // the table. Table cell text itself has already been filtered from the
      // reading flow, so the image stays clean and tight.
      const next = siblings
        .filter((item) => Number(item.y) < Number(block.y))
        .sort((a, b) => Number(b.y) - Number(a.y))[0];
      cropTop = Math.max(0, captionTop + H * 0.008);
      const bottom = next ? (pageHeight - Number(next.y)) * scale - 8 : H * 0.92;
      cropHeight = Math.min(H * 0.6, bottom - cropTop);
      if (cropHeight < H * 0.1) {
        cropTop = Math.min(H * 0.78, captionTop + H * 0.008);
        cropHeight = H * 0.24;
      }
    } else {
      // Figure captions sit below their figures, so crop from the previous
      // text block down to the caption, not a fixed band around the page.
      const previous = siblings
        .filter((item) => Number(item.y) > Number(block.y))
        .sort((a, b) => Number(a.y) - Number(b.y))[0];
      const bottom = captionTop + H * 0.004;
      cropTop = previous
        ? Math.max(0, (pageHeight - Number(previous.lastY || previous.y)) * scale + 6)
        : Math.max(H * 0.1, captionTop - H * 0.38);
      cropHeight = Math.min(H * 0.58, bottom - cropTop);
      if (cropHeight < H * 0.08) {
        cropTop = Math.max(0, captionTop - H * 0.28);
        cropHeight = H * 0.29;
      }
    }
    if (cropTop >= H || cropHeight < H * 0.06) return '';
    cropHeight = Math.min(cropHeight, H - cropTop);
    const offsetY = cropHeight ? -(cropTop / cropHeight) * 100 : 0;
    return '<figure class="figure-preview">' +
      '<button class="figure-window" data-action="zoom-page" data-page="' + image.page + '" title="查看图表原页" style="aspect-ratio:' + W + '/' + Math.round(cropHeight) + '">' +
        '<img src="' + image.dataUrl + '" alt="' + escapeAttr(block.text) + ' 的原页图像" loading="lazy" decoding="async" style="--figure-offset-y:' + offsetY.toFixed(3) + '%">' +
        '<span class="figure-hint">' + (isTable ? '表格原页' : '图像原页') + ' · 点击放大</span>' +
      '</button>' +
    '</figure>';
  }

  function renderBlock(block, index) {
    if (block.type === 'h2') return renderHeadingBlock(block, index, 'h2');
    if (block.type === 'h3') return renderHeadingBlock(block, index, 'h3');
    if (block.type === 'h4') return renderHeadingBlock(block, index, 'h4');
    if (block.type === 'h5') return renderHeadingBlock(block, index, 'h5');
    if (block.type === 'caption') {
      return figurePreviewHTML(block) + '<p class="caption block" data-block="' + index + '">' + renderSentenceGroup(block.text, index) + '</p>';
    }
    if (block.type === 'figure-preview') {
      return '<div class="block" data-block="' + index + '">' + figurePreviewHTML(block) + '</div>';
    }
    if (block.type === 'ref') {
      return '<p class="ref-entry block" data-block="' + index + '">' + escapeHTML(block.text) + '</p>';
    }
    return '<p class="body-text block" data-block="' + index + '">' + renderSentenceGroup(block.text, index) + '</p>';
  }

  function renderHeadingBlock(block, index, tag) {
    let inner = renderSentenceGroup(block.text, index);
    inner = inner.replace(/(<span class="sentence-text">)(\d{1,2}(?:\.\d{1,2}){0,3}\.?)(\s)/, '$1<span class="sec-no">$2</span>$3');
    return '<' + tag + ' class="block" data-block="' + index + '">' + inner + '</' + tag + '>';
  }

  function renderHeadingText(text) {
    const clean = escapeHTML(text);
    return clean.replace(/^(\d{1,2}(?:\.\d{1,2}){0,3}\.?)/, '<span class="sec-no">$1</span>');
  }

  function renderSentenceGroup(text, blockIndex) {
    if (blockIndex === -1) {
      // Abstract text is prepared separately and lives in runtime as a pseudo-block.
      const list = runtime.sentences.filter((sentence) => sentence.blockIndex === -1);
      if (list.length) return list.map((s) => sentenceHTML(s)).join(' ');
      const pieces = splitSentences(text);
      return pieces.map((piece) => '<span class="sentence is-static">' + escapeHTML(piece) + '</span>').join(' ');
    }
    const list = runtime.byBlock.get(blockIndex) || [];
    if (!list.length) return escapeHTML(text);
    return list.map((sentence) => sentenceHTML(sentence)).join(' ');
  }

  function sentenceHTML(sentence, extraClass) {
    const anns = runtime.annsBySid.get(sentence.sid) || [];
    const trans = state.translations[sentence.sid] || '';
    const badges = anns
      .filter((ann) => {
        const span = runtime.annSpans.get(ann.id);
        return span && span.endSid === sentence.sid;
      })
      .map((ann) => {
        const n = runtime.annNumbers.get(ann.id) || '';
        return '<sup class="ann-sup" data-ann-id="' + escapeAttr(ann.id) + '" title="批注 ' + n + '">' + n + '</sup>';
      }).join('');
    const hasAnn = anns.length ? ' has-ann' : '';
    return '<span class="sentence' + (extraClass ? ' ' + extraClass : '') + hasAnn + '" data-sid="' + escapeAttr(sentence.sid) + '">' +
      '<span class="sentence-text">' + renderMarkedSentence(sentence, anns) + '</span>' +
      badges +
      '</span><span class="sentence-trans" data-sid="' + escapeAttr(sentence.sid) + '">' + (trans ? escapeHTML(trans) : '') + '</span>';
  }

  function renderMarkedSentence(sentence, anns) {
    const text = sentence.text;
    if (!anns || !anns.length) return escapeHTML(text);
    const intervals = [];
    anns.forEach((ann) => {
      const local = annotationLocalInterval(ann, sentence);
      if (!local || local.end <= local.start) return;
      intervals.push({ start: local.start, end: local.end, ann });
    });
    if (!intervals.length) return escapeHTML(text);
    intervals.sort((a, b) => (a.start - b.start) || (b.end - a.end));
    const merged = [];
    intervals.forEach((item) => {
      const last = merged[merged.length - 1];
      if (last && item.start < last.end) {
        last.end = Math.max(last.end, item.end);
        last.annotations.push(item.ann);
      } else {
        merged.push({ start: item.start, end: item.end, annotations: [item.ann] });
      }
    });
    let html = '';
    let cursor = 0;
    merged.forEach((segment) => {
      if (segment.start > cursor) html += escapeHTML(text.slice(cursor, segment.start));
      const ordered = segment.annotations.slice().sort((a, b) => (Number(b.updatedAt) || 0) - (Number(a.updatedAt) || 0));
      const primary = ordered[0];
      const color = getColor(primary.color);
      const active = segment.annotations.some((ann) => ann.id === state.activeAnnId);
      const ids = segment.annotations.map((ann) => ann.id).join(' ');
      html += '<mark class="inline-mark inline-mark-' + (COLORS[primary.color] ? primary.color : 'sage') + (active ? ' is-active' : '') + '"' +
        ' data-ann-id="' + escapeAttr(primary.id) + '"' +
        ' data-ann-ids="' + escapeAttr(ids) + '"' +
        ' style="--mark-bg:' + color.soft + ';--mark-line:' + color.hex + '">' +
        escapeHTML(text.slice(segment.start, segment.end)) + '</mark>';
      cursor = segment.end;
    });
    if (cursor < text.length) html += escapeHTML(text.slice(cursor));
    return html;
  }

  function refreshPaperHighlights() {
    const scroll = document.getElementById('docScroll');
    const top = scroll ? scroll.scrollTop : 0;
    renderPaperHTML();
    const nextScroll = document.getElementById('docScroll');
    if (nextScroll) nextScroll.scrollTop = top;
  }

  function updateActiveHighlights() {
    const paper = document.getElementById('paper');
    if (!paper) return;
    paper.querySelectorAll('.inline-mark').forEach((mark) => {
      const ids = (mark.dataset.annIds || mark.dataset.annId || '').split(' ');
      mark.classList.toggle('is-active', ids.includes(state.activeAnnId));
    });
  }

  function scrollCardIntoView(annotationId, behavior) {
    const marginScroll = document.getElementById('marginScroll');
    if (!marginScroll) return;
    const card = marginScroll.querySelector('.ann-card[data-id="' + cssEscape(annotationId) + '"]');
    if (!card) return;
    const marginRect = marginScroll.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const fullyVisible = cardRect.top >= marginRect.top + 3 && cardRect.bottom <= marginRect.bottom - 3;
    if (fullyVisible) return;
    const delta = cardRect.top - marginRect.top;
    const centered = marginScroll.scrollTop + delta - Math.max(10, (marginScroll.clientHeight - card.offsetHeight) / 2);
    marginScroll.scrollTo({ top: Math.max(0, centered), behavior: behavior || 'auto' });
  }

  function focusAnnotationContent(ann) {
    if (!ann) return;
    if (state.editor) {
      state.editor = null;
      renderAnnotationList();
    }
    state.activeAnnId = ann.id;
    updateActiveHighlights();
    $$('.ann-card').forEach((card) => card.classList.toggle('is-active', card.dataset.id === ann.id));
    scrollCardIntoView(ann.id, 'smooth');
    if (window.innerWidth <= 980) {
      const workspace = document.getElementById('workspace');
      if (workspace) workspace.classList.add('annotations-open');
    }
  }

  function syncMarginToReading() {
    if (!state.doc || state.showOriginal || state.editor) return;
    if (Date.now() < runtime.suppressSyncUntil) return;
    if (!state.annotations.length) return;
    const scroll = document.getElementById('docScroll');
    const paper = document.getElementById('paper');
    if (!scroll || !paper) return;
    const scrollRect = scroll.getBoundingClientRect();
    const anchor = scrollRect.top + scroll.clientHeight * 0.5;
    let currentIndex = 0;
    const sentenceEls = paper.querySelectorAll('.sentence[data-sid]');
    for (let i = 0; i < sentenceEls.length; i += 1) {
      const top = sentenceEls[i].getBoundingClientRect().top - scrollRect.top;
      if (top > anchor) break;
      const idx = runtime.order.get(sentenceEls[i].dataset.sid);
      if (idx != null) currentIndex = idx;
    }

    const spans = state.annotations.map((ann) => ({ ann, span: runtime.annSpans.get(ann.id) }))
      .filter((item) => item.span)
      .sort((a, b) => a.span.startIndex - b.span.startIndex);
    if (!spans.length) return;
    let candidate = null;
    for (const item of spans) {
      if (item.span.startIndex > currentIndex) break;
      candidate = item.ann;
      if (item.span.endIndex >= currentIndex) break;
    }
    if (!candidate) candidate = spans[0].ann;
    if (!candidate) return;
    if (candidate.id === state.activeAnnId) {
      scrollCardIntoView(candidate.id, 'auto');
      return;
    }
    state.activeAnnId = candidate.id;
    runtime.lastSyncAnnId = candidate.id;
    updateActiveHighlights();
    $$('.ann-card').forEach((card) => card.classList.toggle('is-active', card.dataset.id === candidate.id));
    scrollCardIntoView(candidate.id, 'auto');
  }

  function scheduleMarginSync() {
    if (runtime.syncFrame) return;
    runtime.syncFrame = requestAnimationFrame(() => {
      runtime.syncFrame = null;
      syncMarginToReading();
    });
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(value);
    return String(value).replace(/["\\]/g, '\\$&');
  }

  /* ---------------------------------------------------------
     Rendering — margin annotations
     --------------------------------------------------------- */

  function renderAnnotationList() {
    const host = document.getElementById('annotationList');
    if (!host) return;
    const marginScroll = document.getElementById('marginScroll');
    const previousScroll = marginScroll ? marginScroll.scrollTop : 0;
    host.innerHTML = (state.editor ? editorHTML() : '') + annotationCardsHTML();
    if (marginScroll) marginScroll.scrollTop = previousScroll;
    if (state.editor) {
      const editor = host.querySelector('.editor');
      if (editor) {
        // restore focus only when the sheet is first opened
        if (state.pendingFocus) {
          state.pendingFocus = false;
          const note = editor.querySelector('.note-input');
          if (note && !note.value) note.focus({ preventScroll: true });
        }
      }
    }
    updateCounters();
  }

  function visibleAnnotations() {
    const query = normalizeForMatch(state.query);
    return state.annotations
      .filter((ann) => {
        if (state.filter === 'all') return true;
        if (state.filter === '__untagged') return !ann.tag;
        return ann.tag === state.filter;
      })
      .filter((ann) => {
        if (!query) return true;
        const haystack = normalizeForMatch([ann.quote, ann.translation, ann.note, ann.tag].join(' '));
        return haystack.includes(query);
      })
      .sort((a, b) => {
        const ai = runtime.order.get(a.range ? a.range.startSid : a.sid) || 0;
        const bi = runtime.order.get(b.range ? b.range.startSid : b.sid) || 0;
        return ai - bi;
      });
  }

  function annotationCardsHTML() {
    const list = visibleAnnotations();
    if (!list.length) {
      if (state.editor) return '';
      if (state.annotations.length && (state.query || state.filter !== 'all')) {
        return '<div class="no-result">没有匹配的批注。<br>试试更换关键词或标签。</div>';
      }
      return '<div class="empty-margin">' +
        '<div class="empty-glyph"></div>' +
        '<h3>从一句话开始</h3>' +
        '<p>点击左侧任意一句英文，译文与批注会在这里展开。你写下的判断，会成为下次阅读的线索。</p>' +
        '<div class="empty-tip">原文 · 译文 · 批注<br>都会随文稿一起保存</div>' +
      '</div>';
    }

    return list.map((ann) => {
      const sentence = runtime.bySid.get(ann.sid);
      const color = getColor(ann.color);
      const number = runtime.annNumbers.get(ann.id) || 1;
      const meta = runtime.blockMeta.get(sentence ? sentence.blockIndex : -1) || { section: '文献', paraNo: 0, page: 1 };
      const translation = ann.translation || (sentence ? state.translations[sentence.sid] : '') || '';
      return '<article class="ann-card ' + (ann.id === state.activeAnnId ? 'is-active' : '') + '" data-action="locate-ann" data-id="' + escapeAttr(ann.id) + '" data-sid="' + escapeAttr(ann.sid) + '" style="--card-color:' + color.hex + ';animation-delay:' + Math.min(number * 25, 180) + 'ms">' +
        '<div class="ann-top">' +
          '<span class="ann-no">' + String(number).padStart(2, '0') + '</span>' +
          (ann.tag ? '<span class="ann-tag">' + escapeHTML(ann.tag) + '</span>' : '<span class="ann-tag is-untagged">未分类</span>') +
          '<div class="ann-card-actions">' +
            '<button class="mini-btn" data-action="locate-ann" data-id="' + escapeAttr(ann.id) + '" title="定位原文">' + icon('locate') + '</button>' +
            '<button class="mini-btn" data-action="edit-ann" data-id="' + escapeAttr(ann.id) + '" title="编辑批注">' + icon('pen') + '</button>' +
            '<button class="mini-btn danger" data-action="delete-ann" data-id="' + escapeAttr(ann.id) + '" title="删除批注">' + icon('trash') + '</button>' +
          '</div>' +
        '</div>' +
        '<p class="ann-quote">' + escapeHTML(ann.quote || (sentence ? sentence.text : '')) + '</p>' +
        (translation ? '<p class="ann-trans">' + escapeHTML(translation) + '</p>' : '') +
        '<p class="ann-note">' + escapeHTML(ann.note || '未填写批注') + '</p>' +
        '<div class="ann-foot"><span class="ann-loc">' + escapeHTML(shortText(meta.section, 22)) + (meta.paraNo ? ' · 第 ' + meta.paraNo + ' 段' : '') + ' · 第 ' + (meta.page || 1) + ' 页</span><span class="ann-time">' + formatDate(ann.updatedAt || ann.createdAt) + '</span></div>' +
      '</article>';
    }).join('');
  }

  function editorHTML() {
    const editor = state.editor;
    if (!editor) return '';
    const sentence = runtime.bySid.get(editor.sid);
    if (!sentence) return '';
    const existing = editor.existingId ? state.annotations.find((a) => a.id === editor.existingId) : null;
    const draft = editor.draft || {};
    const color = editor.color || (existing ? existing.color : 'ochre');
    const tag = editor.tag != null ? editor.tag : (existing && existing.tag ? existing.tag : '');
    const translation = draft.translation != null ? draft.translation : ((existing && existing.translation) || state.translations[editor.sid] || '');
    const note = draft.note != null ? draft.note : (existing ? existing.note : '');
    return '<section class="editor" id="annotationEditor">' +
      '<div class="editor-head">' +
        '<span class="editor-label">' + (existing ? '编辑批注' : '新建批注') + '</span>' +
        '<button class="editor-close" data-action="close-editor" title="收起" aria-label="收起批注">' + icon('close') + '</button>' +
      '</div>' +
      '<blockquote class="editor-original">' + escapeHTML(editor.quote || sentence.text) + '</blockquote>' +
      '<div class="field-label"><span>译文</span><button class="field-action" data-action="translate-current" type="button" id="editorTranslateBtn">翻译 / 重新翻译</button></div>' +
      '<textarea class="trans-input" id="editorTranslation" rows="3" placeholder="可点击上方自动翻译，也可以手动写下译文…">' + escapeHTML(translation) + '</textarea>' +
      '<div class="field-label"><span>批注</span><span style="color:var(--faint);font-weight:400;letter-spacing:.02em">支持中文</span></div>' +
      '<textarea class="note-input" id="editorNote" rows="4" placeholder="这句话为什么重要？它与研究问题、方法或你的阅读判断有什么关联？">' + escapeHTML(note) + '</textarea>' +
      '<div class="editor-section">' +
        '<div class="field-label" style="margin-top:0"><span>标记颜色</span><span style="color:var(--faint);font-weight:400">' + escapeHTML(getColor(color).label) + '</span></div>' +
        '<div class="swatches">' +
          Object.keys(COLORS).map((key) => '<button type="button" class="swatch ' + (key === color ? 'is-selected' : '') + '" data-action="choose-color" data-color="' + key + '" style="--swatch-color:' + COLORS[key].soft + '" title="' + COLORS[key].label + '" aria-label="' + COLORS[key].label + '"></button>').join('') +
        '</div>' +
      '</div>' +
      '<div class="editor-section">' +
        '<div class="field-label" style="margin-top:0"><span>归类标签</span><button class="field-action" data-action="manage-tags" type="button">管理标签</button></div>' +
        '<select class="tag-select" id="editorTag">' +
          '<option value=""' + (tag === '' ? ' selected' : '') + '>不添加标签</option>' +
          currentTags().map((item) => '<option value="' + escapeAttr(item) + '"' + (item === tag ? ' selected' : '') + '>' + escapeHTML(item) + '</option>').join('') +
        '</select>' +
      '</div>' +
      '<div class="editor-actions">' +
        '<button class="btn btn-sm btn-primary save-btn" data-action="save-editor">' + (existing ? '更新批注' : '保存批注') + '</button>' +
        (existing ? '<button class="btn btn-sm btn-danger" data-action="delete-editor" title="删除这条批注">' + icon('trash') + '</button>' : '') +
        '<button class="btn btn-sm btn-ghost" data-action="close-editor">取消</button>' +
      '</div>' +
      '<p class="editor-hint">提示：按 <span class="kbd">Ctrl</span> + <span class="kbd">Enter</span> 快速保存。译文与批注会随文稿自动保存。</p>' +
    '</section>';
  }

  function updateCounters() {
    const counter = document.getElementById('annCounter');
    if (counter) counter.textContent = state.annotations.length;
    const mobile = document.getElementById('mobileAnnCount');
    if (mobile) mobile.textContent = state.annotations.length;
  }

  /* ---------------------------------------------------------
     Annotation interactions
     --------------------------------------------------------- */

  function openEditor(sid) {
    const sentence = runtime.bySid.get(sid);
    if (!sentence) return;
    if (window.getSelection && String(window.getSelection()).length > 0) return;
    openEditorForRange(rangeForSentence(sentence), sentence.text, null);
  }

  function openEditorForAnnotation(ann) {
    if (!ann) return;
    const start = runtime.bySid.get(ann.range ? ann.range.startSid : ann.sid);
    if (!start) return;
    openEditorForRange(ann.range || rangeForSentence(start), ann.quote || start.text, ann.id);
  }

  function openEditorForRange(range, quote, existingId) {
    const sentence = runtime.bySid.get(range.startSid);
    if (!sentence) return;
    const existing = existingId ? state.annotations.find((ann) => ann.id === existingId) : null;
    const full = isFullSentenceRange(range);
    const draftTranslation = existing
      ? (existing.translation || (full ? state.translations[range.startSid] : '') || '')
      : (full ? (state.translations[range.startSid] || '') : '');
    state.editor = {
      sid: range.startSid,
      range: Object.assign({}, range),
      quote: normalizeSpace(quote || sentence.text),
      existingId: existing ? existing.id : null,
      color: existing ? existing.color : 'ochre',
      tag: existing ? (existing.tag || '') : '',
      draft: {
        translation: draftTranslation || '',
        note: existing ? existing.note : ''
      }
    };
    state.activeAnnId = existing ? existing.id : null;
    state.pendingFocus = true;
    renderAnnotationList();
    refreshPaperHighlights();
    const workspace = document.getElementById('workspace');
    if (workspace) workspace.classList.add('annotations-open');
    const scroll = document.getElementById('marginScroll');
    if (scroll) scroll.scrollTop = 0;
    hideSelectionMenu();
    if (!draftTranslation && settings.autoTranslate) {
      autoTranslateEditor();
    }
  }

  function closeEditor() {
    if (!state.editor) return;
    state.editor = null;
    state.pendingFocus = false;
    renderAnnotationList();
    refreshPaperHighlights();
  }

  /* ---------------------------------------------------------
     Text selection → range annotation
     --------------------------------------------------------- */

  function sentenceTextElement(node) {
    if (!node) return null;
    const el = node.nodeType === 3 ? node.parentElement : node;
    if (!el || !el.closest) return null;
    return el.closest('.sentence-text');
  }

  function offsetWithinSentenceText(element, node, offset) {
    if (!element || !node || !element.contains(node)) return null;
    try {
      const range = document.createRange();
      range.selectNodeContents(element);
      range.setEnd(node, offset);
      return range.toString().length;
    } catch (err) {
      return null;
    }
  }

  function quoteForRange(range) {
    const start = runtime.bySid.get(range.startSid);
    const end = runtime.bySid.get(range.endSid);
    if (!start || !end) return '';
    const startIndex = runtime.order.get(range.startSid);
    const endIndex = runtime.order.get(range.endSid);
    if (startIndex == null || endIndex == null) return '';
    if (startIndex === endIndex) return normalizeSpace(start.text.slice(range.startOffset, range.endOffset));
    const parts = [start.text.slice(range.startOffset)];
    for (let i = startIndex + 1; i < endIndex; i += 1) {
      if (runtime.sentences[i]) parts.push(runtime.sentences[i].text);
    }
    parts.push(end.text.slice(0, range.endOffset));
    return normalizeSpace(parts.join(' '));
  }

  function captureSelection() {
    if (!state.doc || state.view !== 'workspace') return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      hideSelectionMenu();
      return;
    }
    const range = selection.getRangeAt(0);
    const paper = document.getElementById('paper');
    if (!paper || !paper.contains(range.commonAncestorContainer)) {
      hideSelectionMenu();
      return;
    }
    let startEl = sentenceTextElement(range.startContainer);
    let endEl = sentenceTextElement(range.endContainer);
    if (!startEl || !endEl) {
      hideSelectionMenu();
      return;
    }
    let startOffset = offsetWithinSentenceText(startEl, range.startContainer, range.startOffset);
    let endOffset = offsetWithinSentenceText(endEl, range.endContainer, range.endOffset);
    if (startOffset == null || endOffset == null) {
      hideSelectionMenu();
      return;
    }
    let startSentence = runtime.bySid.get(startEl.closest('.sentence').dataset.sid);
    let endSentence = runtime.bySid.get(endEl.closest('.sentence').dataset.sid);
    if (!startSentence || !endSentence) {
      hideSelectionMenu();
      return;
    }
    let startIndex = runtime.order.get(startSentence.sid);
    let endIndex = runtime.order.get(endSentence.sid);
    if (startIndex == null || endIndex == null) return;
    if (startIndex > endIndex) {
      const tmpSentence = startSentence;
      const tmpOffset = startOffset;
      startSentence = endSentence;
      startOffset = endOffset;
      endSentence = tmpSentence;
      endOffset = tmpOffset;
      startIndex = runtime.order.get(startSentence.sid);
      endIndex = runtime.order.get(endSentence.sid);
    }
    startOffset = clamp(startOffset, 0, startSentence.text.length);
    endOffset = clamp(endOffset, 0, endSentence.text.length);
    if (startSentence.sid === endSentence.sid && endOffset - startOffset < 2) {
      hideSelectionMenu();
      return;
    }
    const rangeData = {
      startSid: startSentence.sid,
      startOffset,
      endSid: endSentence.sid,
      endOffset
    };
    const quote = quoteForRange(rangeData);
    if (quote.length < 2) {
      hideSelectionMenu();
      return;
    }
    runtime.pendingSelection = { range: rangeData, quote };
    const rect = range.getBoundingClientRect();
    const menu = document.getElementById('selectionMenu');
    if (!menu) return;
    menu.innerHTML = '<span class="selection-hint">已选 ' + quote.length + ' 字符</span><span class="selection-divider"></span>' +
      '<button data-action="annotate-selection">批注所选内容</button><span class="selection-divider"></span><button data-action="close-selection">取消</button>';
    menu.hidden = false;
    const center = rect.width ? rect.left + rect.width / 2 : window.innerWidth / 2;
    menu.style.left = clamp(center, 150, window.innerWidth - 150) + 'px';
    if (rect.top < 88) {
      menu.style.top = clamp(rect.bottom + 10, 72, window.innerHeight - 52) + 'px';
      menu.style.transform = 'translate(-50%, 0)';
    } else {
      menu.style.top = clamp(rect.top - 9, 84, window.innerHeight - 12) + 'px';
      menu.style.transform = 'translate(-50%, -100%)';
    }
  }

  function hideSelectionMenu() {
    const menu = document.getElementById('selectionMenu');
    if (menu) {
      menu.hidden = true;
      menu.innerHTML = '';
    }
    runtime.pendingSelection = null;
  }

  function annotatePendingSelection() {
    const pending = runtime.pendingSelection;
    if (!pending) return;
    const editor = { range: pending.range, quote: pending.quote };
    hideSelectionMenu();
    openEditorForRange(editor.range, editor.quote, null);
  }

  function collectEditorValues() {
    const transEl = document.getElementById('editorTranslation');
    const noteEl = document.getElementById('editorNote');
    const tagEl = document.getElementById('editorTag');
    return {
      translation: transEl ? transEl.value.trim() : '',
      note: noteEl ? noteEl.value.trim() : '',
      tag: tagEl ? tagEl.value : ''
    };
  }

  function saveEditor() {
    if (!state.editor) return;
    const values = collectEditorValues();
    if (!values.translation && !values.note) {
      toast('请至少写下译文或批注内容。', 'error');
      const note = document.getElementById('editorNote');
      if (note) note.focus();
      return;
    }
    const docScroll = document.getElementById('docScroll');
    const readingScroll = docScroll ? docScroll.scrollTop : 0;
    const sentence = runtime.bySid.get(state.editor.sid);
    if (!sentence) return;
    const existing = state.editor.existingId ? state.annotations.find((a) => a.id === state.editor.existingId) : null;
    const range = state.editor.range || rangeForSentence(sentence);
    const quote = state.editor.quote || sentence.text;
    let ann;
    if (existing) {
      existing.translation = values.translation;
      existing.note = values.note;
      existing.tag = values.tag;
      existing.color = state.editor.color;
      existing.range = Object.assign({}, range);
      existing.quote = quote;
      existing.sid = range.startSid;
      existing.updatedAt = Date.now();
      ann = existing;
    } else {
      ann = {
        id: uid('ann'),
        sid: range.startSid,
        quote,
        range: Object.assign({}, range),
        translation: values.translation,
        note: values.note,
        tag: values.tag,
        color: state.editor.color,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      state.annotations.push(ann);
    }
    if (isFullSentenceRange(range)) {
      if (values.translation) state.translations[range.startSid] = values.translation;
      else delete state.translations[range.startSid];
    }

    state.editor = null;
    state.activeAnnId = ann.id;
    state.pendingFocus = false;
    runtime.suppressSyncUntil = Date.now() + 600;
    recalcAnnotationMaps();
    bump();
    renderAnnotationList();
    refreshPaperHighlights();
    const scrollAfter = document.getElementById('docScroll');
    if (scrollAfter) scrollAfter.scrollTop = readingScroll;
    requestAnimationFrame(() => {
      if (scrollAfter) scrollAfter.scrollTop = readingScroll;
      scrollCardIntoView(ann.id, 'smooth');
    });
    toast(existing ? '批注已更新。' : '批注已保存。');
  }

  async function autoTranslateEditor() {
    if (!state.editor) return;
    const editorRef = state.editor;
    const quote = editorRef.quote;
    if (!quote) return;
    setTranslateButtonState('翻译中…', true);
    try {
      const zh = await translateText(quote);
      if (state.editor !== editorRef) return;
      const input = document.getElementById('editorTranslation');
      if (input && !input.value.trim()) {
        input.value = zh;
        if (state.editor.draft) state.editor.draft.translation = zh;
      }
      setTranslateButtonState('已生成 · 可修改', false);
    } catch (err) {
      setTranslateButtonState('翻译失败 · 可重试', false);
    }
  }

  async function translateCurrentEditor() {
    if (!state.editor) return;
    const editorRef = state.editor;
    const quote = editorRef.quote;
    if (!quote) return;
    const input = document.getElementById('editorTranslation');
    setTranslateButtonState('翻译中…', true);
    try {
      const zh = await translateText(quote);
      if (state.editor !== editorRef) return;
      if (input) input.value = zh;
      if (state.editor && state.editor.draft) state.editor.draft.translation = zh;
      setTranslateButtonState('已生成 · 可修改', false);
    } catch (err) {
      setTranslateButtonState('翻译失败 · 请检查设置', false);
      toast('翻译服务暂时不可用。可在右上角设置中检查翻译方式。', 'error', 5200);
    }
  }

  function setTranslateButtonState(text, loading) {
    const btn = document.getElementById('editorTranslateBtn');
    if (!btn) return;
    btn.textContent = text;
    btn.classList.toggle('is-loading', Boolean(loading));
    btn.disabled = Boolean(loading);
  }

  function chooseColor(color) {
    if (!state.editor || !COLORS[color]) return;
    state.editor.color = color;
    $$('.swatch').forEach((el) => el.classList.toggle('is-selected', el.dataset.color === color));
    const label = document.querySelector('.editor-section .field-label span:last-child');
    if (label) label.textContent = COLORS[color].label;
  }

  function locateAnnotation(id) {
    const ann = state.annotations.find((a) => a.id === id);
    if (!ann) return;
    if (state.showOriginal) setOriginalMode(false);
    state.activeAnnId = id;
    runtime.suppressSyncUntil = Date.now() + 800;
    refreshPaperHighlights();
    $$('.ann-card').forEach((card) => card.classList.toggle('is-active', card.dataset.id === id));
    const sentence = document.querySelector('.sentence[data-sid="' + cssEscape(ann.sid) + '"]');
    if (sentence) {
      sentence.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (window.innerWidth <= 980) {
      const workspace = document.getElementById('workspace');
      if (workspace) workspace.classList.remove('annotations-open');
    }
  }

  function locateSid(sid) {
    const sentence = document.querySelector('.sentence[data-sid="' + cssEscape(sid) + '"]');
    if (sentence) sentence.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function editAnnotation(id) {
    const ann = state.annotations.find((a) => a.id === id);
    if (!ann) return;
    openEditorForAnnotation(ann);
  }

  async function deleteAnnotation(id) {
    const ann = state.annotations.find((a) => a.id === id);
    if (!ann) return;
    const ok = await confirmDialog({
      title: '删除这条批注？',
      message: '原文与译文仍会保留，但这条批注、标签和标记颜色将从文稿中移除。此操作无法撤销。',
      confirmLabel: '删除批注',
      danger: true
    });
    if (!ok) return;
    state.annotations = state.annotations.filter((a) => a.id !== id);
    if (state.activeAnnId === id) state.activeAnnId = null;
    if (state.editor && state.editor.existingId === id) state.editor = null;
    recalcAnnotationMaps();
    bump();
    renderAnnotationList();
    refreshPaperHighlights();
    toast('批注已删除。');
  }

  /* ---------------------------------------------------------
     Translation workflow
     --------------------------------------------------------- */

  function translationSentencesForScope(scope) {
    let list = runtime.sentences.slice();
    if (scope === 'marked') {
      const ids = new Set(state.annotations.map((a) => a.sid));
      list = list.filter((sentence) => ids.has(sentence.sid));
    } else if (scope === 'abstract') {
      list = list.filter((sentence) => sentence.blockIndex === -1 || (state.doc.blocks[sentence.blockIndex] && state.doc.blocks[sentence.blockIndex].type === 'abstract'));
    } else {
      list = list.filter((sentence) => {
        if (sentence.blockIndex === -1) return true;
        const block = state.doc.blocks[sentence.blockIndex];
        return block && block.type !== 'ref';
      });
    }
    return list.filter((sentence) => !state.translations[sentence.sid]);
  }

  function openTranslateModal() {
    if (!state.doc) return;
    const abstractCount = translationSentencesForScope('abstract').length;
    const markedCount = translationSentencesForScope('marked').length;
    const allCount = translationSentencesForScope('all').length;
    const provider = providerLabel(settings.provider);
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="translateModalTitle" data-stop="1">' +
      '<div class="modal-header"><div><h2 id="translateModalTitle">翻译文献</h2><p>逐句生成中文译文。已有译文不会重复翻译。</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-body">' +
        '<div class="translate-note">当前方式：<b>' + escapeHTML(provider) + '</b>。免费接口适合逐句或摘要翻译；整篇翻译建议在设置中使用大模型 API，速度与术语一致性会更好。</div>' +
        '<div style="display:grid;gap:9px;margin-top:18px">' +
          '<button class="btn" style="justify-content:space-between;min-height:54px;padding:12px 15px" data-action="run-translation" data-scope="abstract" ' + (abstractCount ? '' : 'disabled') + '><span style="text-align:left"><b style="display:block;font-weight:600;font-size:12px">摘要与总结</b><small style="color:var(--muted);font-size:9.5px">优先翻译摘要，共 ' + abstractCount + ' 句待译</small></span>' + icon('arrow') + '</button>' +
          '<button class="btn" style="justify-content:space-between;min-height:54px;padding:12px 15px" data-action="run-translation" data-scope="marked" ' + (markedCount ? '' : 'disabled') + '><span style="text-align:left"><b style="display:block;font-weight:600;font-size:12px">仅已批注的句子</b><small style="color:var(--muted);font-size:9.5px">补齐批注卡中的译文，共 ' + markedCount + ' 句待译</small></span>' + icon('arrow') + '</button>' +
          '<button class="btn" style="justify-content:space-between;min-height:54px;padding:12px 15px" data-action="run-translation" data-scope="all" ' + (allCount ? '' : 'disabled') + '><span style="text-align:left"><b style="display:block;font-weight:600;font-size:12px">正文全文</b><small style="color:var(--muted);font-size:9.5px">不含参考文献，共 ' + allCount + ' 句待译</small></span>' + icon('arrow') + '</button>' +
        '</div>' +
        '<p class="help" style="margin:16px 0 0;color:var(--muted);font-size:9.5px;line-height:1.75">翻译会逐句保存在本地。若译文不理想，可在批注编辑器中直接修改。</p>' +
      '</div>' +
      '<div class="modal-foot"><span class="left"><button class="text-link" style="border:0;background:transparent;color:var(--sage);font-size:10px;cursor:pointer;text-decoration:underline;text-underline-offset:3px" data-action="open-settings">调整翻译设置</button></span><button class="btn btn-sm" data-action="close-modal">取消</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
  }

  async function startTranslation(scope) {
    const pendingSentences = translationSentencesForScope(scope);
    const items = pendingSentences.map((sentence) => ({
      id: sentence.sid,
      sid: sentence.sid,
      text: sentence.text
    }));
    if (!items.length) {
      toast('这一范围内没有需要翻译的句子。');
      return;
    }
    closeModal();
    const job = {
      cancelled: false,
      total: items.length,
      done: 0,
      ok: 0,
      errors: []
    };
    state.job = job;
    showTranslationJob(job);

    const cfg = currentSettings();
    const useLLM = cfg.provider === 'llm' || cfg.provider === 'ollama';
    const progress = (done) => {
      job.done = done;
      updateTranslationJob(job);
    };
    const isCancelled = () => job.cancelled;

    let result;
    if (useLLM) {
      result = await translateBatchLLM(items, cfg, progress, isCancelled);
    } else {
      result = await translateBatchFree(items, cfg, progress, isCancelled);
    }

    let added = 0;
    result.translations.forEach((zh, sid) => {
      if (zh) {
        state.translations[sid] = zh;
        const linked = state.annotations.find((ann) => ann.sid === sid);
        if (linked && !linked.translation) linked.translation = zh;
        added += 1;
      }
    });

    if (job.cancelled) {
      state.job = null;
      if (added) {
        state.showBilingual = true;
        bump();
        persistNow();
        const paper = document.getElementById('paper');
        if (paper) paper.classList.add('is-bilingual');
        const toggle = document.querySelector('.bilingual-toggle');
        if (toggle) toggle.classList.add('is-on');
        refreshPaperHighlights();
        renderAnnotationList();
      }
      closeModal();
      toast(added ? '已停止翻译，保留完成的 ' + added + ' 句译文。' : '已停止翻译。');
      return;
    }

    job.ok = added;
    job.errors = result.errors;
    state.job = null;
    state.showBilingual = true;
    if (added) bump();
    persistNow();
    const paper = document.getElementById('paper');
    if (paper) paper.classList.add('is-bilingual');
    const toggle = document.querySelector('.bilingual-toggle');
    if (toggle) toggle.classList.add('is-on');
    refreshPaperHighlights();
    renderAnnotationList();

    if (result.errors.length) {
      showTranslationResult(job);
    } else {
      closeModal();
      toast('已翻译 ' + added + ' 句。双语对照已开启，可在左侧逐句阅读。');
    }
  }

  function showTranslationJob(job) {
    overlays.innerHTML = '<div class="overlay"><div class="process-sheet" role="dialog" aria-modal="true">' +
      '<div class="process-seal">译</div>' +
      '<h3>正在逐句翻译</h3>' +
      '<p class="process-file">' + escapeHTML(providerLabel(settings.provider)) + ' · 同时保留原文与专业术语</p>' +
      '<div class="translate-progress"><div class="process-bar"><span id="jobBar" style="width:2%"></span></div><p id="jobText">0 / ' + job.total + ' 句</p></div>' +
      '<div class="process-tip">翻译完成后会自动开启双语对照。你可以随时停止，已完成的译文不会丢失。</div>' +
      '<div class="modal-foot" style="border:0;padding:18px 0 0;justify-content:center"><button class="btn btn-sm" data-action="cancel-translation">停止翻译</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
  }

  function updateTranslationJob(job) {
    const bar = document.getElementById('jobBar');
    const text = document.getElementById('jobText');
    const ratio = job.total ? job.done / job.total : 0;
    if (bar) bar.style.width = Math.max(2, Math.round(ratio * 100)) + '%';
    if (text) text.textContent = job.done + ' / ' + job.total + ' 句';
  }

  function showTranslationResult(job) {
    const firstErrors = job.errors.slice(0, 4);
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" data-stop="1">' +
      '<div class="modal-header"><div><h2>翻译已完成</h2><p>成功 ' + job.ok + ' 句，失败 ' + job.errors.length + ' 句。</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-body">' +
        '<div class="translate-note">失败的句子通常是网络、接口额度或跨域限制造成的。已完成的译文已经保存；你可以直接手动修改，或调整翻译方式后重试。</div>' +
        (firstErrors.length ? '<ul class="error-list">' + firstErrors.map((e) => '<li>' + escapeHTML(shortText(e, 170)) + '</li>').join('') + '</ul>' : '') +
        '<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-primary" data-action="open-settings">检查翻译设置</button><button class="btn" data-action="close-modal">稍后处理</button></div>' +
      '</div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
  }

  /* ---------------------------------------------------------
     Custom classification tags
     --------------------------------------------------------- */

  function tagManagerListHTML() {
    if (!currentTags().length) {
      return '<div class="tag-empty">还没有标签。添加一个常用的归类名称，之后新建批注时就能直接选择。</div>';
    }
    return currentTags().map((tag) => {
      const count = state.annotations.filter((ann) => ann.tag === tag).length;
      return '<div class="tag-row">' +
        '<span class="tag-row-name">' + escapeHTML(tag) + '</span>' +
        '<span class="tag-row-count">' + (count ? count + ' 条批注' : '未使用') + '</span>' +
        '<button class="mini-btn danger" data-action="delete-tag" data-tag="' + escapeAttr(tag) + '" title="删除标签">' + icon('trash') + '</button>' +
      '</div>';
    }).join('');
  }

  function openTagManager() {
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" style="max-width:460px" role="dialog" aria-modal="true" aria-labelledby="tagManagerTitle" data-stop="1">' +
      '<div class="modal-header"><div><h2 id="tagManagerTitle">管理归类标签</h2><p>标签属于当前这篇文献。新增后，之后的新批注会直接看到；删除后，已用该标签的批注会变为未分类。</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-body">' +
        '<div id="tagManagerList" class="tag-list">' + tagManagerListHTML() + '</div>' +
        '<div class="tag-add-row">' +
          '<input type="text" id="newTagInput" maxlength="18" placeholder="例如：概念界定、案例材料、可引用" autocomplete="off">' +
          '<button class="btn btn-sm btn-primary" data-action="add-tag">添加标签</button>' +
        '</div>' +
        '<p class="help" style="margin:10px 0 0;color:var(--muted);font-size:9.5px;line-height:1.7">最多 18 个字符。批注也可以不添加标签。</p>' +
      '</div>' +
      '<div class="modal-foot"><button class="btn btn-sm" data-action="close-modal">完成</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
    setTimeout(() => {
      const input = document.getElementById('newTagInput');
      if (input) input.focus();
    }, 120);
  }

  function renderTagManagerList() {
    const host = document.getElementById('tagManagerList');
    if (host) host.innerHTML = tagManagerListHTML();
    syncTagFilter();
  }

  function syncTagFilter() {
    const filter = document.getElementById('annFilter');
    if (!filter) return;
    const value = state.filter;
    filter.innerHTML = '<option value="all">全部标签</option><option value="__untagged">未分类</option>' +
      currentTags().map((tag) => '<option value="' + escapeAttr(tag) + '">' + escapeHTML(tag) + '</option>').join('');
    filter.value = Array.from(filter.options).some((opt) => opt.value === value) ? value : 'all';
    if (filter.value !== state.filter) state.filter = filter.value;
  }

  function addTagFromManager() {
    const input = document.getElementById('newTagInput');
    const tag = sanitizeTag(input ? input.value : '');
    if (!tag) {
      toast('请输入一个标签名称。', 'error');
      if (input) input.focus();
      return;
    }
    if (currentTags().includes(tag)) {
      toast('这个标签已经存在。');
      if (input) input.value = '';
      return;
    }
    state.tags.push(tag);
    if (state.editor) state.editor.tag = tag;
    if (input) input.value = '';
    bump();
    renderTagManagerList();
    renderAnnotationList();
    toast('标签「' + tag + '」已添加。');
  }

  function deleteTag(tag) {
    if (!tag) return;
    state.tags = currentTags().filter((item) => item !== tag);
    let affected = 0;
    state.annotations.forEach((ann) => {
      if (ann.tag === tag) {
        ann.tag = '';
        affected += 1;
      }
    });
    if (state.editor && state.editor.tag === tag) state.editor.tag = '';
    if (state.filter === tag) state.filter = 'all';
    bump();
    renderTagManagerList();
    renderAnnotationList();
    toast(affected ? '标签已删除，' + affected + ' 条批注已转为未分类。' : '标签已删除。');
  }

  /* ---------------------------------------------------------
     Translation settings
     --------------------------------------------------------- */

  function openSettings() {
    const s = currentSettings();
    const providers = [
      ['auto', '自动选择（推荐）', '依次尝试 MyMemory、Google 与浏览器内置翻译'],
      ['llm', '大模型 API（推荐用于全文）', 'OpenAI 兼容接口，术语更稳、可批量翻译'],
      ['ollama', 'Ollama 本地模型', '本机运行，不把文献发送到外部服务'],
      ['builtin', '浏览器内置翻译', 'Chrome / Edge 支持时可用，无需 API Key'],
      ['google', 'Google 翻译公开接口', '免费接口，适合摘要与短句'],
      ['mymemory', 'MyMemory 翻译记忆库', '免费接口，有每日额度限制']
    ];
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="settingsTitle" data-stop="1">' +
      '<div class="modal-header"><div><h2 id="settingsTitle">翻译设置</h2><p>API Key 仅保存在当前浏览器的本地存储中，不会写入导出的文献 HTML。</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-body">' +
        '<div class="field"><label>翻译方式</label><select id="settingProvider">' +
          providers.map(([value, label]) => '<option value="' + value + '"' + (s.provider === value ? ' selected' : '') + '>' + escapeHTML(label) + '</option>').join('') +
        '</select><p class="help">' + escapeHTML(providers.find((p) => p[0] === s.provider) ? providers.find((p) => p[0] === s.provider)[2] : '') + '</p></div>' +
        '<div id="llmFields" style="display:' + ((s.provider === 'llm' || s.provider === 'ollama') ? 'block' : 'none') + '">' +
          '<div class="field"><label>API 地址 <small>完整的 chat/completions 地址</small></label><input type="url" id="settingEndpoint" value="' + escapeAttr(s.endpoint) + '" placeholder="https://api.deepseek.com/v1/chat/completions" spellcheck="false"><p class="help">支持 DeepSeek、OpenAI、Moonshot、智谱等 OpenAI 兼容接口。</p></div>' +
          '<div class="field"><label>模型名称</label><input type="text" id="settingModel" value="' + escapeAttr(s.model) + '" placeholder="deepseek-chat" spellcheck="false"></div>' +
          '<div class="field" id="apiKeyField" style="display:' + (s.provider === 'ollama' ? 'none' : 'block') + '"><label>API Key</label><input type="password" id="settingApiKey" value="' + escapeAttr(s.apiKey) + '" placeholder="sk-…" autocomplete="off"><p class="help">只保存在本机。导出批注版 HTML 时不会包含这项设置。</p></div>' +
        '</div>' +
        '<div class="toggle-row"><div><p>打开批注时自动翻译</p><small>点击未翻译的句子时，自动请求译文并填入编辑框。</small></div><button class="switch ' + (s.autoTranslate ? 'is-on' : '') + '" id="settingAutoTranslate" data-action="toggle-switch" aria-label="自动翻译开关"></button></div>' +
        '<div class="field" style="margin-top:15px"><label>测试当前翻译方式</label><button class="btn btn-sm" data-action="test-translation">' + icon('spark') + ' 翻译一句测试文本</button><div id="testResult" class="test-result" hidden></div></div>' +
      '</div>' +
      '<div class="modal-foot"><span class="left">免费接口可能受网络与额度影响</span><button class="btn btn-sm" data-action="close-modal">取消</button><button class="btn btn-sm btn-primary" data-action="save-settings">保存设置</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
  }

  function readSettingsForm() {
    const providerEl = document.getElementById('settingProvider');
    const endpointEl = document.getElementById('settingEndpoint');
    const modelEl = document.getElementById('settingModel');
    const keyEl = document.getElementById('settingApiKey');
    const autoEl = document.getElementById('settingAutoTranslate');
    return {
      provider: providerEl ? providerEl.value : settings.provider,
      endpoint: endpointEl ? endpointEl.value.trim() : settings.endpoint,
      model: modelEl ? modelEl.value.trim() : settings.model,
      apiKey: keyEl ? keyEl.value.trim() : settings.apiKey,
      autoTranslate: autoEl ? autoEl.classList.contains('is-on') : settings.autoTranslate
    };
  }

  function saveSettingsForm() {
    const next = readSettingsForm();
    if (next.provider === 'ollama' && !next.endpoint) next.endpoint = 'http://localhost:11434/v1/chat/completions';
    if (next.provider === 'ollama' && !next.model) next.model = 'qwen2.5:7b';
    Object.assign(settings, next);
    writeJSON(LS_SETTINGS, settings);
    closeModal();
    toast('翻译设置已保存。');
  }

  async function testTranslation() {
    const result = document.getElementById('testResult');
    if (!result) return;
    const cfg = readSettingsForm();
    result.hidden = false;
    result.className = 'test-result';
    result.textContent = '正在测试 ' + providerLabel(cfg.provider) + '…';
    try {
      const zh = await translateText('Responsible AI is shaped by local trust, risk, and public persuasion.', cfg);
      result.className = 'test-result is-ok';
      result.textContent = '测试成功：' + zh;
    } catch (err) {
      result.className = 'test-result is-error';
      result.textContent = '测试失败：' + err.message + '。可尝试更换翻译方式，或检查网络与 API Key。';
    }
  }

  function updateSettingsProviderUI() {
    const providerEl = document.getElementById('settingProvider');
    if (!providerEl) return;
    const provider = providerEl.value;
    const fields = document.getElementById('llmFields');
    const keyField = document.getElementById('apiKeyField');
    if (fields) fields.style.display = provider === 'llm' || provider === 'ollama' ? 'block' : 'none';
    if (keyField) keyField.style.display = provider === 'ollama' ? 'none' : 'block';
    const help = providerEl.parentElement.querySelector('.help');
    if (help) {
      const descriptions = {
        auto: '依次尝试 MyMemory、Google 与浏览器内置翻译。',
        llm: 'OpenAI 兼容接口，术语更稳、可批量翻译。',
        ollama: '本机运行，不把文献发送到外部服务。',
        builtin: 'Chrome / Edge 支持时可用，无需 API Key。',
        google: '免费接口，适合摘要与短句。',
        mymemory: '免费接口，有每日额度限制。'
      };
      help.textContent = descriptions[provider] || '';
    }
  }

  /* ---------------------------------------------------------
     Export
     --------------------------------------------------------- */

  function downloadHTML() {
    if (!state.doc) return;
    const payload = snapshot();
    const clone = document.documentElement.cloneNode(true);
    const appClone = clone.querySelector('#app');
    if (appClone) appClone.innerHTML = '';
    const overlaysClone = clone.querySelector('#overlays');
    if (overlaysClone) overlaysClone.innerHTML = '';
    const toastClone = clone.querySelector('#toast-root');
    if (toastClone) toastClone.innerHTML = '';
    clone.querySelectorAll('#pdfjs-source, #pdfworker-source').forEach((node) => node.remove());
    const embedded = clone.querySelector('#embedded-state');
    if (embedded) {
      embedded.textContent = JSON.stringify(payload).replace(/<\//g, '<\\/');
    }
    const titleNode = clone.querySelector('title');
    if (titleNode) titleNode.textContent = displayNameOf(state.doc) + ' · 批注版';
    const desc = clone.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', '文澜批注版：' + (state.doc.title || '') + '。原文、译文与批注已内嵌，可离线打开。');
    const body = clone.querySelector('body');
    if (body) body.className = '';
    const html = '<!DOCTYPE html>\n' + clone.outerHTML;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = safeFilename(displayNameOf(state.doc)) + '｜批注版.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    toast('批注版 HTML 已生成。文件可独立打开，原文、译文与批注都在里面。');
  }

  /* ---------------------------------------------------------
     Dialogs & toasts
     --------------------------------------------------------- */

  function toast(message, type, duration) {
    if (!toastRoot) return;
    while (toastRoot.children.length >= 3) {
      toastRoot.firstElementChild.remove();
    }
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' is-error' : '');
    el.innerHTML = '<span class="toast-mark"></span><span>' + escapeHTML(message) + '</span>';
    toastRoot.appendChild(el);
    const ms = duration || 3600;
    setTimeout(() => {
      el.classList.add('is-out');
      setTimeout(() => el.remove(), 260);
    }, ms);
  }

  function confirmDialog(options) {
    return new Promise((resolve) => {
      const title = options.title || '确认操作';
      const message = options.message || '';
      const confirmLabel = options.confirmLabel || '确认';
      const cancelLabel = options.cancelLabel || '取消';
      const danger = Boolean(options.danger);
      overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" style="max-width:440px" role="dialog" aria-modal="true" data-stop="1">' +
        '<div class="modal-header"><div><h2>' + escapeHTML(title) + '</h2><p>' + escapeHTML(message) + '</p></div></div>' +
        '<div class="modal-foot"><button class="btn btn-sm" data-confirm="no">' + escapeHTML(cancelLabel) + '</button><button class="btn btn-sm ' + (danger ? 'btn-danger' : 'btn-primary') + '" data-confirm="yes">' + escapeHTML(confirmLabel) + '</button></div>' +
      '</div></div>';
      document.body.classList.add('has-overlay');
      const finish = (value) => {
        closeModal();
        resolve(value);
      };
      overlays.querySelectorAll('[data-confirm]').forEach((btn) => {
        btn.addEventListener('click', () => finish(btn.dataset.confirm === 'yes'));
      });
      const overlay = overlays.querySelector('.overlay');
      if (overlay) {
        overlay.addEventListener('click', (event) => {
          if (event.target === overlay) finish(false);
        });
      }
    });
  }

  function closeModal() {
    if (state.job) {
      // A translation job has its own cancel flow; closing the sheet stops it.
      state.job.cancelled = true;
    }
    overlays.innerHTML = '';
    document.body.classList.remove('has-overlay');
  }

  function showProcess() {
    overlays.innerHTML = '<div class="overlay"><div class="process-sheet" role="dialog" aria-modal="true">' +
      '<div class="process-seal">读</div>' +
      '<h3 id="processTitle">正在逐页解读</h3>' +
      '<p class="process-file" id="processFile">准备文献…</p>' +
      '<div class="process-bar"><span id="processBar" style="width:3%"></span></div>' +
      '<div class="process-meta"><span id="processLabel">正在打开 PDF</span><b id="processPercent">0%</b></div>' +
      '<div class="process-tip" id="processDetail">文字只在你的浏览器里解析，不会上传到任何服务器。</div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
  }

  function updateProcess(progress) {
    const bar = document.getElementById('processBar');
    const percent = document.getElementById('processPercent');
    const label = document.getElementById('processLabel');
    const detail = document.getElementById('processDetail');
    const file = document.getElementById('processFile');
    if (bar) bar.style.width = Math.round(clamp(progress.ratio, 0, 1) * 100) + '%';
    if (percent) percent.textContent = Math.round(clamp(progress.ratio, 0, 1) * 100) + '%';
    if (label && progress.label) label.textContent = progress.label;
    if (detail && progress.detail) detail.textContent = progress.detail;
    if (file && progress.filename) file.textContent = progress.filename;
  }

  function showError(title, message) {
    overlays.innerHTML = '<div class="overlay" data-action="close-modal"><div class="modal" style="max-width:490px" role="dialog" aria-modal="true" data-stop="1">' +
      '<div class="modal-header"><div><h2>' + escapeHTML(title) + '</h2><p>' + escapeHTML(message) + '</p></div><button class="icon-btn" data-action="close-modal" aria-label="关闭">' + icon('close') + '</button></div>' +
      '<div class="modal-foot"><span class="left">也可以换一份带文字层的 PDF 再试</span><button class="btn btn-sm" data-action="close-modal">知道了</button><button class="btn btn-sm btn-primary" data-action="pick-file">换一份 PDF</button></div>' +
    '</div></div>';
    document.body.classList.add('has-overlay');
  }

  /* ---------------------------------------------------------
     File intake
     --------------------------------------------------------- */

  function pickFile() {
    let input = document.getElementById('fileInput');
    if (!input) {
      input = document.createElement('input');
      input.type = 'file';
      input.id = 'fileInput';
      input.accept = 'application/pdf,.pdf';
      input.className = 'visually-hidden';
      document.body.appendChild(input);
    }
    input.click();
  }

  async function openPdfFile(file) {
    if (!file) return;
    if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') {
      toast('请选择 PDF 格式的英文文献。', 'error');
      return;
    }
    if (file.size > 80 * 1024 * 1024) {
      toast('文件超过 80 MB，解析可能会很慢，请换一份较小的 PDF。', 'error', 5000);
      return;
    }
    if (state.pdfBusy) return;
    state.pdfBusy = true;
    showProcess();
    updateProcess({ ratio: 0.01, label: '正在打开 PDF', detail: '文件：' + file.name, filename: shortText(file.name, 64) });
    try {
      const doc = await parsePdfFile(file, (progress) => {
        updateProcess(Object.assign({ filename: shortText(file.name, 64) }, progress));
      });
      doc.displayName = cleanDocumentName(file.name) || doc.title;
      const existing = readRecentDocs().find((item) => normalizeForMatch(item.doc.title) === normalizeForMatch(doc.title));
      if (existing && normalizeForMatch(existing.doc.title) === normalizeForMatch(doc.title) && existing.annotations && existing.annotations.length) {
        const reuse = await confirmDialog({
          title: '这篇文献已有批注记录',
          message: '检测到同一标题的文献已有 ' + existing.annotations.length + ' 条批注。要恢复旧批注，还是把它作为一份新的文献重新开始？',
          confirmLabel: '恢复旧批注',
          cancelLabel: '作为新文献',
          danger: false
        });
        if (reuse) {
          closeModal();
          hydrate(existing);
          state.embedded = false;
          state.view = 'workspace';
          render();
          state.pdfBusy = false;
          toast('已恢复这篇文献的旧批注。');
          return;
        }
      }

      state.doc = doc;
      state.annotations = [];
      state.translations = {};
      state.tags = DEFAULT_TAGS.slice();
      state.showBilingual = false;
      state.showOriginal = false;
      state.editor = null;
      state.activeAnnId = null;
      state.embedded = false;
      state.revision = 1;
      state.updatedAt = Date.now();
      prepareDoc(doc, state.translations);
      state.view = 'workspace';
      closeModal();
      render();
      persistNow();
      toast('解析完成。点击任意句子，开始你的批注。');
    } catch (err) {
      closeModal();
      const message = err && err.message ? err.message : '解析失败，请稍后重试。';
      showError('这份 PDF 暂时读不出来', message);
    } finally {
      state.pdfBusy = false;
    }
  }

  function handleFileInputChange(event) {
    const input = event.target;
    if (!input || input.id !== 'fileInput') return;
    const file = input.files && input.files[0];
    input.value = '';
    if (file) openPdfFile(file);
  }

  /* ---------------------------------------------------------
     Navigation & actions
     --------------------------------------------------------- */

  function goHome() {
    if (state.view === 'workspace') {
      const scroll = document.getElementById('docScroll');
      state.scrollTop = scroll ? scroll.scrollTop : state.scrollTop;
      persistNow();
    }
    state.view = 'home';
    state.tocOpen = false;
    render();
  }

  function goWorkspace() {
    if (!state.doc) {
      toast('先上传一篇文献，或打开一份示例。');
      return;
    }
    closeModal();
    state.view = 'workspace';
    render();
  }

  function clearRecents() {
    confirmDialog({
      title: '清空本地文献记录？',
      message: '所有保存在此浏览器中的文献、译文与批注都会被移除。已经下载的批注版 HTML 不受影响。',
      confirmLabel: '清空记录',
      danger: true
    }).then((ok) => {
      if (!ok) return;
      try { localStorage.removeItem(LS_DOCS); } catch (err) { /* noop */ }
      try { localStorage.removeItem(LS_FOLDERS); } catch (err) { /* noop */ }
      clearCachedImages();
      if (!state.embedded) {
        state.doc = null;
        state.annotations = [];
        state.translations = {};
        state.view = 'home';
      }
      render();
      toast('本地记录已清空。');
    });
  }

  function deleteRecentDoc(id) {
    const record = readRecentDocs().find((item) => item.doc.id === id);
    if (!record) return;
    confirmDialog({
      title: '从本地移除这篇文献？',
      message: '“' + shortText(displayNameOf(record.doc), 70) + '”的译文与批注会一起移除。已下载的 HTML 文件不受影响。',
      confirmLabel: '移除记录',
      danger: true
    }).then((ok) => {
      if (!ok) return;
      removeRecent(id);
      render();
      toast('已从本地记录中移除。');
    });
  }

  function handleAction(action, el, event) {
    switch (action) {
      case 'go-home':
        goHome();
        break;
      case 'go-workspace':
        goWorkspace();
        break;
      case 'pick-file':
        if (state.embedded) {
          toast('这是离线批注版。若要解析新文献，请打开原始工作台文件。');
          return;
        }
        pickFile();
        break;
      case 'load-sample':
        loadDemo();
        break;
      case 'open-recent':
        loadRecent(el.dataset.id);
        break;
      case 'clear-recents':
        clearRecents();
        break;
      case 'new-folder':
        openFolderDialog('new');
        break;
      case 'rename-folder':
        openFolderDialog('rename', el.dataset.id);
        break;
      case 'save-folder':
        saveFolderDialog(el);
        break;
      case 'delete-folder':
        deleteFolderById(el.dataset.id);
        break;
      case 'scroll-folder':
        scrollToFolder(el.dataset.folder);
        break;
      case 'move-doc':
        openMoveDialog(el.dataset.id);
        break;
      case 'edit-doc-name':
        openDocNameDialog(el.dataset.id);
        break;
      case 'save-doc-name':
        saveDocNameDialog(el);
        break;
      case 'move-doc-to':
        moveDocToFolder(el.dataset.id, el.dataset.folder || '');
        break;
      case 'delete-doc':
        deleteDocFromLibrary(el.dataset.id);
        break;
      case 'open-settings':
        openSettings();
        break;
      case 'download-html':
        downloadHTML();
        break;
      case 'toggle-bilingual':
        state.showBilingual = !state.showBilingual;
        const paper = document.getElementById('paper');
        if (paper) paper.classList.toggle('is-bilingual', state.showBilingual);
        el.classList.toggle('is-on', state.showBilingual);
        bump();
        break;
      case 'toggle-original':
        setOriginalMode(!state.showOriginal);
        break;
      case 'zoom-page':
        openPageImage(el.dataset.page);
        break;
      case 'zoom-in':
        setZoom(state.zoom + 0.1);
        break;
      case 'zoom-out':
        setZoom(state.zoom - 0.1);
        break;
      case 'zoom-reset':
        setZoom(1);
        break;
      case 'toggle-toc':
        toggleToc();
        break;
      case 'close-toc':
        toggleToc(false);
        break;
      case 'goto-heading':
        goToHeading(el.dataset.block);
        break;
      case 'open-translate-modal':
        openTranslateModal();
        break;
      case 'run-translation':
        startTranslation(el.dataset.scope);
        break;
      case 'cancel-translation':
        if (state.job) {
          state.job.cancelled = true;
          const label = document.getElementById('jobText');
          if (label) label.textContent = '正在停止…已完成的译文会保留';
          persistNow();
        }
        break;
      case 'close-editor':
        closeEditor();
        break;
      case 'save-editor':
        saveEditor();
        break;
      case 'delete-editor':
        if (state.editor && state.editor.existingId) deleteAnnotation(state.editor.existingId);
        break;
      case 'translate-current':
        translateCurrentEditor();
        break;
      case 'choose-color':
        chooseColor(el.dataset.color);
        break;
      case 'annotate-selection':
        annotatePendingSelection();
        break;
      case 'close-selection':
        hideSelectionMenu();
        break;
      case 'manage-tags':
        openTagManager();
        break;
      case 'add-tag':
        addTagFromManager();
        break;
      case 'delete-tag':
        deleteTag(el.dataset.tag);
        break;
      case 'locate-ann':
        locateAnnotation(el.dataset.id);
        break;
      case 'edit-ann':
        editAnnotation(el.dataset.id);
        break;
      case 'delete-ann':
        deleteAnnotation(el.dataset.id);
        break;
      case 'open-margin':
        const ws = document.getElementById('workspace');
        if (ws) ws.classList.add('annotations-open');
        break;
      case 'close-margin':
        const wsn = document.getElementById('workspace');
        if (wsn) wsn.classList.remove('annotations-open');
        break;
      case 'close-modal':
        closeModal();
        break;
      case 'save-settings':
        saveSettingsForm();
        break;
      case 'test-translation':
        testTranslation();
        break;
      case 'toggle-switch':
        el.classList.toggle('is-on');
        break;
      case 'open-translation-settings':
        openSettings();
        break;
      default:
        break;
    }
  }

  /* ---------------------------------------------------------
     Global event wiring
     --------------------------------------------------------- */

  document.addEventListener('click', (event) => {
    const annTarget = event.target.closest('.inline-mark, .ann-sup');
    const hasSelection = window.getSelection && String(window.getSelection()).trim().length > 1;
    if (annTarget && annTarget.dataset.annId && !hasSelection) {
      const ann = state.annotations.find((item) => item.id === annTarget.dataset.annId);
      if (ann) {
        event.preventDefault();
        event.stopPropagation();
        focusAnnotationContent(ann);
        return;
      }
    }
    const actionEl = event.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === 'close-modal' && event.target !== actionEl && !actionEl.hasAttribute('data-stop')) {
        // Let nested buttons win; backdrop only when the click target is the overlay itself.
        if (!event.target.classList.contains('overlay')) return;
      }
      if (action === 'open-recent' || action === 'delete-ann' || action === 'edit-ann' || action === 'locate-ann') {
        event.preventDefault();
        event.stopPropagation();
      }
      handleAction(action, actionEl, event);
      return;
    }

    const sentence = event.target.closest('.sentence');
    if (sentence && sentence.dataset.sid && !sentence.classList.contains('is-static')) {
      if (window.getSelection && String(window.getSelection()).length > 0) return;
      openEditor(sentence.dataset.sid);
    }
  });

  document.addEventListener('mousedown', (event) => {
    if (!event.target.closest || !event.target.closest('#selectionMenu')) {
      hideSelectionMenu();
    }
  });

  document.addEventListener('mouseup', (event) => {
    if (event.target.closest && event.target.closest('#selectionMenu')) return;
    if (event.button !== 0) return;
    setTimeout(captureSelection, 20);
  });

  document.addEventListener('touchend', () => {
    setTimeout(captureSelection, 180);
  }, { passive: true });

  document.addEventListener('keyup', (event) => {
    if (event.shiftKey || event.key === 'Shift') {
      setTimeout(captureSelection, 20);
    }
  });

  document.addEventListener('change', (event) => {
    if (event.target && event.target.id === 'fileInput') {
      handleFileInputChange(event);
      return;
    }
    if (event.target && event.target.id === 'settingProvider') {
      updateSettingsProviderUI();
      return;
    }
    if (event.target && event.target.id === 'annFilter') {
      state.filter = event.target.value;
      renderAnnotationList();
      return;
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target && event.target.id === 'annSearch') {
      state.query = event.target.value;
      renderAnnotationList();
      return;
    }
    if (state.editor && state.editor.draft) {
      if (event.target && event.target.id === 'editorTranslation') {
        state.editor.draft.translation = event.target.value;
      }
      if (event.target && event.target.id === 'editorNote') {
        state.editor.draft.note = event.target.value;
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target && event.target.id === 'newTagInput') {
      event.preventDefault();
      addTagFromManager();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      if (state.editor && document.getElementById('annotationEditor')) {
        event.preventDefault();
        saveEditor();
      }
    }
    if (event.key === 'Escape') {
      hideSelectionMenu();
      if (state.pdfBusy) return;
      if (overlays.innerHTML.trim()) {
        closeModal();
      } else if (state.editor) {
        closeEditor();
      } else {
        const ws = document.getElementById('workspace');
        if (ws) ws.classList.remove('annotations-open');
      }
    }
  });

  // Drag & drop intake
  document.addEventListener('dragover', (event) => {
    const zone = event.target.closest && event.target.closest('#dropzone');
    if (!zone || state.embedded) return;
    event.preventDefault();
    zone.classList.add('is-dragover');
  });

  document.addEventListener('dragleave', (event) => {
    const zone = event.target.closest && event.target.closest('#dropzone');
    if (zone && !zone.contains(event.relatedTarget)) zone.classList.remove('is-dragover');
  });

  document.addEventListener('drop', (event) => {
    const zone = event.target.closest && event.target.closest('#dropzone');
    if (!zone || state.embedded) return;
    event.preventDefault();
    zone.classList.remove('is-dragover');
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) openPdfFile(file);
  });

  function bindWorkspaceEvents() {
    const scroll = document.getElementById('docScroll');
    if (scroll) {
      scroll.addEventListener('scroll', () => {
        hideSelectionMenu();
        updateReadingProgress();
        updateTocActive();
        scheduleMarginSync();
      }, { passive: true });
      scroll.addEventListener('wheel', (event) => {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault();
        setZoom(state.zoom + (event.deltaY < 0 ? 0.05 : -0.05));
      }, { passive: false });
    }
    const filter = document.getElementById('annFilter');
    if (filter) filter.value = state.filter;
  }

  function updateReadingProgress() {
    const scroll = document.getElementById('docScroll');
    const bar = document.getElementById('readingProgress');
    if (!scroll || !bar) return;
    const max = scroll.scrollHeight - scroll.clientHeight;
    const ratio = max > 0 ? clamp(scroll.scrollTop / max, 0, 1) : 0;
    bar.style.width = (ratio * 100).toFixed(2) + '%';
  }

  /* ---------------------------------------------------------
     Startup
     --------------------------------------------------------- */

  function readEmbeddedState() {
    const node = document.getElementById('embedded-state');
    if (!node) return null;
    const raw = (node.textContent || '').trim();
    if (!raw || raw === 'null') return null;
    try {
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  async function boot() {
    buildTranslationMemory();
    window.addEventListener('resize', () => requestAnimationFrame(applyPaperZoom));
    const embedded = readEmbeddedState();
    if (embedded && embedded.doc) {
      state.embedded = true;
      let payload = embedded;
      const local = readJSON(exportStorageKey(embedded.doc.id), null);
      if (local && local.doc && Number(local.updatedAt) > Number(embedded.updatedAt || 0)) {
        payload = local;
      }
      hydrate(payload);
      if (!state.doc.pageImages || !state.doc.pageImages.length) {
        const cached = await loadCachedImages(state.doc.id);
        if (cached && cached.length) {
          state.doc.pageImages = cached;
          runtime.pageCacheSavedFor = state.doc.id;
        } else if (embedded.doc.pageImages && embedded.doc.pageImages.length) {
          state.doc.pageImages = embedded.doc.pageImages;
        }
      } else {
        runtime.pageCacheSavedFor = state.doc.id;
      }
      state.view = 'home';
      state.updatedAt = Number(payload.updatedAt) || Date.now();
      state.revision = Number(payload.revision) || 0;
      state.lastSaved = null;
      render();
      if (payload !== embedded) {
        setTimeout(() => toast('已恢复本浏览器中较新的批注记录。'), 700);
      }
      return;
    }

    // Normal workspace: keep the landing page quiet and use recents as the entry.
    state.view = 'home';
    render();
    if (!document.getElementById('pdfjs-source')) {
      setTimeout(() => toast('离线批注版不会解析新的 PDF；请使用原始工作台文件上传文献。'), 600);
    }
  }

  // A small public surface makes the app easy to verify and extend.
  window.Wenlan = {
    version: APP_VERSION,
    state: state,
    importFile: openPdfFile,
    parseFile: parsePdfFile,
    loadDemo: loadDemo,
    export: downloadHTML,
    translate: translateText
  };

  boot();
})();
