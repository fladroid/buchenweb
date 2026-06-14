(function() {

// ── Verzija portala — bump na kraju svake sesije ──
const BB_VERSION = 's77';
const BB_VERSION_DATE = '14 Jun 2026';

const NAV_I18N = {
  en: { home:"Home", about:"About", stats:"X-Ray Stats", books:"Library",
        nlp:"NLP", reader:"Reader", learn:"Learn", geometry:"Geometry", art:"Art",
        stats_title:"X-Ray Statistics",
        stats_subtitle:"Aggregate data from the Buchenberg pipeline — winner distribution, scores, and coverage. Data is loaded live from translation JSON files.",
        stats_total_sent:"Total translated sentences",
        stats_total_books:"Books in corpus",
        stats_lang_combos:"Language × book combinations",
        stats_avg_ts:"Avg translation score (all)",
        stats_winners_title:"Winner distribution by model",
        stats_winners_sub:"How often each model wins — across all books and languages.",
        stats_coverage_title:"Coverage by book and language",
        stats_coverage_sub:"Number of translated sentences per book/language combination.",
        stats_score_title:"Average scores by language",
        stats_score_sub:"Avg translation score and judge score per language (all books combined). Higher is better; max 1.0.",
        stats_col_model:"Model", stats_col_wins:"Wins", stats_col_dist:"Distribution",
        stats_col_book:"Book", stats_col_lang:"Language", stats_col_sent:"Sentences",
        stats_col_avg_ts:"Avg translation score", stats_col_avg_j:"Avg judge score",
        stats_warning:"⚠ Statistics are computed client-side from the same JSON files used by the Reader. Winner model information requires judge data (judge_avg) to be present. Sentences without judge data are excluded from judge averages.",
        books_title:"Library",
        books_subtitle:"All books are sourced from Project Gutenberg (public domain). Each translation is a sentence-level hybrid produced by the Buchenberg pipeline.",
        books_lbl_sentences:"sentences", books_lbl_languages:"languages",
        books_btn_read:"Read", books_btn_gutenberg:"Gutenberg", books_btn_ner:"NER", books_btn_wordcloud:"Word cloud",
        books_coming_soon:"coming soon",
        books_wc_compare:"Compare with:", books_wc_loading:"Building word cloud…",
        books_wc_coverage:"{n} of {total} sentences translated ({pct}%) — word cloud reflects translated sample only",
        books_wc_en_full:"EN — Full text ({n} sentences)",
        books_wc_tr_sample:"{lang} — {n} translated sentences",
        index_tagline:"Open-source machine translation pipeline for classic literature",
        index_hero_desc:`Buchenberg is a research project that translates public-domain books from
      <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a> into multiple
      languages using open-source machine translation models — then measures and ranks
      translation quality automatically, sentence by sentence.<br><br>
      The name <strong>Buchenberg</strong> is a deliberate echo of <strong>Gutenberg</strong> —
      honouring the spirit of the original project while extending it into the age of
      machine translation. <em>Buch</em> is German for <em>book</em>; the suffix
      <em>-enberg</em> ties us to our source.`,
        index_sec_how:"How it works",
        index_how_desc:`Each sentence of a source book is translated into a target language using three
      different models — <strong>Gemma 3 12B</strong>, <strong>Ministral 3 14B</strong>,
      and <strong>NLLB-600M</strong> — at various temperatures.
      The resulting translations are then back-translated to English and compared to
      the original using <strong>cosine similarity</strong> on multilingual embeddings.
      A fourth model, <strong>Gemma 4 31B</strong>, acts as a blind judge — rating each
      candidate on grammar, naturalness, and fidelity.
      The sentence-level winner is selected by combining both scores.
      The final document is a hybrid: the best translation for each sentence, regardless of model.`,
        index_pillar_bt:"Translate to target language, then back to English. Measure cosine similarity between original and round-tripped text. A high score means the translation preserved meaning.",
        index_pillar_judge:"Gemma 4 31B evaluates each candidate translation blindly on three axes: grammar, naturalness, and fidelity to the original. Judge score carries 60% of the final ranking weight.",
        index_pillar_winner:"No single model wins every sentence. The final document combines the best-scoring translation per sentence — a hybrid that outperforms any individual model.",
        index_sec_status:"Current status",
        index_lbl_books:"Books in corpus", index_lbl_langs:"Target languages",
        index_lbl_sentences:"Sentences translated", index_lbl_models:"Translation models",
        index_cta_books:"Browse library", index_cta_about:"About", index_cta_stats:"X-Ray statistics",
        index_opensource:`<strong>100% open source.</strong> All models used are freely available. No proprietary APIs, no cloud translation services.
      Source books are from <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a> — public domain, freely distributable.
      The pipeline runs on commodity hardware with a PostgreSQL backend and
      <a href="https://ollama.com" target="_blank">Ollama</a> for local and cloud LLM inference.`,
        nlp_title:"Natural Language Processing",
        nlp_subtitle:"Word cloud and named entity analysis of original English texts.",
        nlp_book_label:"Book:",
        nlp_wc_title:"Word Cloud — EN Original",
        nlp_ner_title:"Named Entities", nlp_text_title:"Original Text",
        nlp_net_title:"Entity Network", nlp_click_hint:"Click an entity to highlight sentences",
        nlp_links_title:"Entity Links", nlp_conflicts_title:"Type Conflicts",
        nlp_conflicts_sub:"Entities classified under multiple types",
        nlp_th_from:"From", nlp_th_to:"To", nlp_th_weight:"Links",
        nlp_th_entity:"Entity", nlp_th_types:"Types",
        nlp_tip_all:"All", nlp_tip_person:"Person", nlp_tip_place:"Place", nlp_tip_org:"Org",
        about_title:"About Buchenberg",
        about_h_name:"The name", about_h_problem:"The problem", about_h_pipeline:"The pipeline",
        about_h_models:"Models", about_h_llm_nllb:"LLM vs. NLLB — two different kinds of machine",
        about_h_embeddings:"Embeddings", about_h_scoring:"Scoring",
        about_h_infrastructure:"Infrastructure", about_h_source:"Source material",
        about_h_learnings:"Key learnings",
        about_h_lineage:"Lineage — from the Tractatus to Buchenberg",
        about_pipeline_intro:"Each sentence goes through the following stages:",
        about_pipeline_outro:"The same process is repeated with multiple models and temperatures. The winner for each sentence is the candidate with the highest final_score. The exported document is a hybrid — the best translation per sentence, regardless of which model produced it.",
        about_p_name:"<strong>Buchenberg</strong> is a deliberate echo of <strong>Gutenberg</strong> — the project that made millions of public-domain books freely available to anyone with an internet connection. <em>Buch</em> is German for <em>book</em>. The suffix <em>-enberg</em> is a direct tie to our source and a nod to Johannes Gutenberg, whose printing press democratised access to the written word. Buchenberg tries to do the same for translation.",
        about_p_problem:"How do you evaluate machine translation quality when you don’t speak the target language? Standard metrics like BLEU require human reference translations, which are expensive and unavailable for most language pairs. Buchenberg uses a different approach: <strong>back-translation scoring</strong> combined with a <strong>blind LLM judge</strong>.",
        about_p_llm1:"Gemma and Ministral are <strong>LLMs</strong> — general-purpose language models with billions of parameters, trained on a broad slice of human text. Translation is just one of many things they can do. They generate text word by word, and the temperature setting controls how adventurous they are: higher values produce freer, more natural phrasing — at the risk of drifting from the original.",
        about_p_llm2:"<strong>NLLB</strong> is the opposite: a specialist. Built by Meta specifically for translation between 200 languages, it does nothing else. It is 20&times; smaller (600M parameters), runs on an ordinary CPU, and at temperature 0.0 is fully deterministic — the same sentence always yields the same translation, usually a very literal one.",
        about_p_llm3:"This is why the competition works: the LLMs bring naturalness and fluency, NLLB brings reliability and literal fidelity. The judge decides, sentence by sentence, which virtue matters more.",
        about_p_embeddings:"Cosine similarity is computed using <strong>multilingual-e5-large</strong> (1024 dimensions), a multilingual sentence embedding model that works across all target languages. An earlier version used MiniLM-L12, but this was found to be biased toward literal translations, systematically favouring NLLB over more natural outputs. e5-large produces more balanced rankings.",
        about_p_infrastructure:"The pipeline runs on two home servers: <strong>foxuno</strong> (development, Python scripts, git) and <strong>balsam</strong> (PostgreSQL in Docker). No GPU is required — all cloud inference goes through Ollama Cloud; NLLB runs on CPU locally. This is intentional: Buchenberg is designed to work without expensive hardware.",
        about_p_source:"All books are sourced from <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a>, which provides free access to over 70,000 public-domain works. Buchenberg uses only books whose copyright has expired — the translations produced by the pipeline are therefore also freely distributable.",
        about_p_learnings_intro:"Several non-obvious findings emerged during development:",
        about_li_metric:"<strong>Metric ≠ quality.</strong> DeepL-style natural translations scored lower than literal ones under MiniLM. The metric was measuring literalness, not quality.",
        about_li_patterns:"<strong>Model patterns are book-dependent.</strong> The optimal model/temperature combination differs between books and languages — no single setting dominates.",
        about_li_metadata:"<strong>s1–s3 are always metadata</strong> (title, subtitle, author) and should be excluded from meaningful score analysis.",
        about_li_batch:"<strong>Batch processing requires careful fallback.</strong> LLMs sometimes return the wrong number of segments; a single-sentence fallback is essential.",
        about_p_lineage:"Two theories of meaning produced two histories of machine translation. The early Wittgenstein held that meaning is <strong>form</strong> — language mirrors reality — a view that led through Chomsky’s universal grammar to rule-based MT, and crashed with the ALPAC report in 1966. The late Wittgenstein held that meaning is <strong>use</strong> — a view that led through Firth’s distributional semantics to word2vec, attention, and NLLB. Buchenberg works at their intersection: a distributional engine, judged for competence in the language game of each target language. Click any node.",
        about_th_model:"Model", about_th_role:"Role", about_th_engine:"Engine",
        about_role_translation:"Translation", about_role_judge:"Judge only",
        about_role_local:"Local CPU",
        about_th_metric:"Metric", about_th_formula:"Formula", about_th_weight:"Weight",
        about_score_winner:"winner",
        about_sidebar_project_info:"Project info",
        about_sidebar_status:"Status", about_sidebar_active:"Active development",
        about_sidebar_target_langs:"Target languages",
        about_sidebar_south_slavic:"South Slavic", about_sidebar_west_germanic:"West Germanic", about_sidebar_romance:"Romance",
        about_sidebar_philosophy:"Philosophy",
        about_sidebar_philosophy_text:"The path matters more than the destination. The pipeline we are building is generic and applicable far beyond book translation.<br><br>Buchenberg is a practical implementation of the author’s <strong>X-Ray attitude</strong>: refusing to treat machine translation as a black box, and building windows into it — layer by layer, score by score.<br><br>— Flavio",
        about_sidebar_authorship:"Authorship &amp; Collaboration",
        about_sidebar_authorship_text:"Buchenberg is conceived, designed and maintained by <strong>Flavio</strong> (fladroid). The project’s philosophy, methodology, architecture and all final design decisions are his — and remain his sole responsibility.<br><br>The project is built in ongoing collaboration with <strong><a href="https://claude.ai" target="_blank">Claude</a></strong> (Anthropic) — not as a code-completion tool, but as a working partner across more than 60 documented sessions: implementation, debugging, analysis, and the conceptual dialogue that shaped pages like <em>Geometry of Meaning</em> and <em>Art</em>. Every session is recorded in <code>docs/sessions/</code>, where both names appear — a deliberate choice, in the spirit of this project’s X-Ray attitude: the process of building should be as transparent as the thing built.<br><br><em>Flavio &amp; Claude · Buchenberg · 2026</em>" },
  de: { home:"Startseite", about:"Über", stats:"X-Ray Statistik", books:"Bibliothek",
        nlp:"NLP", reader:"Leser", learn:"Lernen", geometry:"Geometrie", art:"Kunst",
        stats_title:"X-Ray Statistik",
        stats_subtitle:"Aggregierte Daten aus der Buchenberg-Pipeline — Gewinnverteilung, Scores und Abdeckung.",
        stats_total_sent:"Übersetzte Sätze gesamt",
        stats_total_books:"Bücher im Korpus",
        stats_lang_combos:"Sprache × Buch-Kombinationen",
        stats_avg_ts:"Ø Übersetzungsscore (alle)",
        stats_winners_title:"Gewinnverteilung nach Modell",
        stats_winners_sub:"Wie oft jedes Modell gewinnt — über alle Bücher und Sprachen.",
        stats_coverage_title:"Abdeckung nach Buch und Sprache",
        stats_coverage_sub:"Anzahl übersetzter Sätze pro Buch/Sprach-Kombination.",
        stats_score_title:"Durchschnittliche Scores nach Sprache",
        stats_score_sub:"Ø Übersetzungs- und Richter-Score je Sprache (alle Bücher). Höher ist besser; max 1,0.",
        stats_col_model:"Modell", stats_col_wins:"Siege", stats_col_dist:"Verteilung",
        stats_col_book:"Buch", stats_col_lang:"Sprache", stats_col_sent:"Sätze",
        stats_col_avg_ts:"Ø Übersetzungsscore", stats_col_avg_j:"Ø Richter-Score",
        stats_warning:"⚠ Statistiken werden clientseitig aus denselben JSON-Dateien berechnet wie im Reader. Gewinnermodell-Informationen erfordern Richter-Daten (judge_avg). Sätze ohne Richter-Daten werden von den Richter-Durchschnittswerten ausgeschlossen.",
        books_title:"Übersetzte Bücher",
        books_subtitle:"Alle Bücher stammen aus dem Project Gutenberg (gemeinfrei). Jede Übersetzung ist ein satzweises Hybrid der Buchenberg-Pipeline.",
        books_lbl_sentences:"Sätze", books_lbl_languages:"Sprachen",
        books_btn_read:"Lesen", books_btn_gutenberg:"Gutenberg", books_btn_ner:"NER", books_btn_wordcloud:"Wortwolke",
        books_coming_soon:"demnächst",
        books_wc_compare:"Vergleichen mit:", books_wc_loading:"Wortwolke wird erstellt…",
        books_wc_coverage:"{n} von {total} Sätzen übersetzt ({pct}%) — Wortwolke zeigt nur übersetzten Teil",
        books_wc_en_full:"EN — Volltext ({n} Sätze)",
        books_wc_tr_sample:"{lang} — {n} übersetzte Sätze",
        index_tagline:"Open-Source-Pipeline für maschinelle Übersetzung klassischer Literatur",
        index_hero_desc:`Buchenberg ist ein Forschungsprojekt, das gemeinfreie Bücher von
      <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a> mit Open-Source-Modellen
      in mehrere Sprachen übersetzt — und die Übersetzungsqualität automatisch, Satz für Satz, misst und bewertet.<br><br>
      Der Name <strong>Buchenberg</strong> ist ein bewusstes Echo von <strong>Gutenberg</strong> —
      im Geist des Originals, erweitert ins Zeitalter der maschinellen Übersetzung.
      <em>Buch</em> bedeutet auf Deutsch Buch; das Suffix <em>-enberg</em> verbindet uns mit unserer Quelle.`,
        index_sec_how:"So funktioniert es",
        index_how_desc:`Jeder Satz eines Quellbuchs wird mit drei verschiedenen Modellen übersetzt —
      <strong>Gemma 3 12B</strong>, <strong>Ministral 3 14B</strong> und <strong>NLLB-600M</strong> —
      bei verschiedenen Temperaturen. Die Übersetzungen werden dann rückübersetzt und mit dem Original
      mittels <strong>Kosinus-Ähnlichkeit</strong> auf mehrsprachigen Embeddings verglichen.
      Ein viertes Modell, <strong>Gemma 4 31B</strong>, fungiert als blinder Richter —
      bewertet Grammatik, Natürlichkeit und Treue. Der Gewinner pro Satz wird durch Kombination beider Scores ermittelt.
      Das Ergebnis ist ein Hybrid: die beste Übersetzung pro Satz, unabhängig vom Modell.`,
        index_pillar_bt:"Übersetze in die Zielsprache, dann zurück ins Englische. Messe die Kosinus-Ähnlichkeit zwischen Original und rückübersetztem Text. Ein hoher Score bedeutet, dass die Bedeutung erhalten blieb.",
        index_pillar_judge:"Gemma 4 31B bewertet jeden Übersetzungskandidaten blind nach drei Kriterien: Grammatik, Natürlichkeit und Treue zum Original. Der Richter-Score trägt 60% des Endranking-Gewichts.",
        index_pillar_winner:"Kein einzelnes Modell gewinnt jeden Satz. Das Ergebnis kombiniert die bestbewertete Übersetzung pro Satz — ein Hybrid, der jedes Einzelmodell übertrifft.",
        index_sec_status:"Aktueller Stand",
        index_lbl_books:"Bücher im Korpus", index_lbl_langs:"Zielsprachen",
        index_lbl_sentences:"Übersetzte Sätze", index_lbl_models:"Übersetzungsmodelle",
        index_cta_books:"Zur Bibliothek", index_cta_about:"Über das Projekt", index_cta_stats:"X-Ray Statistik",
        index_opensource:`<strong>100% Open Source.</strong> Alle verwendeten Modelle sind frei verfügbar. Keine proprietären APIs, keine Cloud-Übersetzungsdienste.
      Quellbücher stammen von <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a> — gemeinfrei und frei verteilbar.
      Die Pipeline läuft auf handelsüblicher Hardware mit einem PostgreSQL-Backend und
      <a href="https://ollama.com" target="_blank">Ollama</a> für lokale und Cloud-LLM-Inferenz.`,
        nlp_title:"Natürliche Sprachverarbeitung",
        nlp_subtitle:"Wortwolke und Named-Entity-Analyse der englischen Originaltexte.",
        nlp_book_label:"Buch:",
        nlp_wc_title:"Wortwolke — EN Original",
        nlp_ner_title:"Benannte Entitäten", nlp_text_title:"Originaltext",
        nlp_net_title:"Entitätsnetzwerk", nlp_click_hint:"Entität anklicken zum Hervorheben",
        nlp_links_title:"Entitätsverknüpfungen", nlp_conflicts_title:"Typkonflikte",
        nlp_conflicts_sub:"Entitäten mit mehreren Typen klassifiziert",
        nlp_th_from:"Von", nlp_th_to:"Zu", nlp_th_weight:"Verbindungen",
        nlp_th_entity:"Entität", nlp_th_types:"Typen",
        nlp_tip_all:"Alle", nlp_tip_person:"Person", nlp_tip_place:"Ort", nlp_tip_org:"Org",
        about_title:"Über Buchenberg",
        about_h_name:"Der Name", about_h_problem:"Das Problem", about_h_pipeline:"Die Pipeline",
        about_h_models:"Modelle", about_h_llm_nllb:"LLM vs. NLLB — zwei verschiedene Maschinentypen",
        about_h_embeddings:"Embeddings", about_h_scoring:"Bewertung",
        about_h_infrastructure:"Infrastruktur", about_h_source:"Quellmaterial",
        about_h_learnings:"Wichtige Erkenntnisse",
        about_h_lineage:"Lineage — vom Tractatus zu Buchenberg",
        about_pipeline_intro:"Jeder Satz durchläuft folgende Stufen:",
        about_pipeline_outro:"Derselbe Prozess wird mit mehreren Modellen und Temperaturen wiederholt. Der Gewinner pro Satz ist der Kandidat mit dem höchsten final_score. Das exportierte Dokument ist ein Hybrid — die beste Übersetzung pro Satz, unabhängig vom Modell.",
        about_p_name:"<strong>Buchenberg</strong> ist ein bewusstes Echo von <strong>Gutenberg</strong> — dem Projekt, das Millionen gemeinfreier Bücher für jeden mit einem Internetzugang zugänglich gemacht hat. <em>Buch</em> ist Deutsch für Buch. Das Suffix <em>-enberg</em> ist eine direkte Verbindung zu unserer Quelle und eine Verbeu­gung vor Johannes Gutenberg, dessen Druckerpresse den Zugang zum geschriebenen Wort demokratisiert hat. Buchenberg versucht dasselbe für die Übersetzung.",
        about_p_problem:"Wie bewertet man die Qualität maschineller Übersetzung, wenn man die Zielsprache nicht spricht? Standardmetriken wie BLEU erfordern menschliche Referenzübersetzungen, die teuer und für die meisten Sprachpaare nicht verfügbar sind. Buchenberg verwendet einen anderen Ansatz: <strong>Back-Translation-Scoring</strong> kombiniert mit einem <strong>blinden LLM-Richter</strong>.",
        about_p_llm1:"Gemma und Ministral sind <strong>LLMs</strong> — Allzweck-Sprachmodelle mit Milliarden von Parametern, trainiert auf einem breiten Querschnitt menschlicher Texte. Übersetzen ist nur eine von vielen Fähigkeiten. Sie generieren Text Wort für Wort, und die Temperatureinstellung bestimmt, wie kreativ sie dabei sind: Höhere Werte erzeugen freiere, natürlichere Formulierungen — auf Kosten einer möglichen Abweichung vom Original.",
        about_p_llm2:"<strong>NLLB</strong> ist das Gegenteil: ein Spezialist. Von Meta speziell für die Übersetzung zwischen 200 Sprachen entwickelt, macht es nichts anderes. Es ist 20&times; kleiner (600M Parameter), läuft auf einer gewöhnlichen CPU, und ist bei Temperatur 0,0 vollständig deterministisch — derselbe Satz ergibt immer dieselbe Übersetzung, meist eine sehr wörtliche.",
        about_p_llm3:"Deshalb funktioniert der Wettbewerb: Die LLMs bringen Natürlichkeit und Flüssigkeit, NLLB bringt Zuverlässigkeit und wörtliche Treue. Der Richter entscheidet, Satz für Satz, welche Tugend wichtiger ist.",
        about_p_embeddings:"Die Kosinus-Ähnlichkeit wird mit <strong>multilingual-e5-large</strong> (1024 Dimensionen) berechnet, einem mehrsprachigen Satz-Embedding-Modell, das über alle Zielsprachen hinweg funktioniert. Eine frühere Version verwendete MiniLM-L12, das sich als voreingenommen gegenüber wörtlichen Übersetzungen erwies und NLLB systematisch gegenüber natürlicheren Ausgaben bevorzugte. e5-large produziert ausgewogenere Rankings.",
        about_p_infrastructure:"Die Pipeline läuft auf zwei Heimservern: <strong>foxuno</strong> (Entwicklung, Python-Skripte, git) und <strong>balsam</strong> (PostgreSQL in Docker). Keine GPU erforderlich — alle Cloud-Inferenz läuft über Ollama Cloud; NLLB läuft lokal auf der CPU. Dies ist beabsichtigt: Buchenberg ist so konzipiert, dass es ohne teure Hardware funktioniert.",
        about_p_source:"Alle Bücher stammen von <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a>, das freien Zugang zu über 70.000 gemeinfreien Werken bietet. Buchenberg verwendet nur Bücher, deren Urheberrecht abgelaufen ist — die von der Pipeline erstellten Übersetzungen sind daher ebenfalls frei verteilbar.",
        about_p_learnings_intro:"Während der Entwicklung haben sich einige nicht offensichtliche Erkenntnisse ergeben:",
        about_li_metric:"<strong>Metrik ≠ Qualität.</strong> DeepL-artige natürliche Übersetzungen schnitten unter MiniLM schlechter ab als wörtliche. Die Metrik maß Wörtlichkeit, nicht Qualität.",
        about_li_patterns:"<strong>Modellmuster sind buchabhängig.</strong> Die optimale Modell/Temperatur-Kombination unterscheidet sich zwischen Büchern und Sprachen — keine einzelne Einstellung dominiert.",
        about_li_metadata:"<strong>s1–s3 sind immer Metadaten</strong> (Titel, Untertitel, Autor) und sollten von der aussagekräftigen Score-Analyse ausgeschlossen werden.",
        about_li_batch:"<strong>Batch-Verarbeitung erfordert sorgfältigen Fallback.</strong> LLMs geben manchmal die falsche Anzahl von Segmenten zurück; ein Einzelsatz-Fallback ist unerlässlich.",
        about_p_lineage:"Zwei Bedeutungstheorien haben zwei Geschichten der maschinellen Übersetzung hervorgebracht. Der frühe Wittgenstein vertrat, dass Bedeutung <strong>Form</strong> ist — Sprache spiegelt die Realität — eine Ansicht, die durch Chomskys Universalgrammatik zur regelbasierten MT führte und 1966 mit dem ALPAC-Bericht scheiterte. Der späte Wittgenstein vertrat, dass Bedeutung <strong>Gebrauch</strong> ist — eine Ansicht, die durch Firths Distributionssemantik zu word2vec, Attention und NLLB führte. Buchenberg arbeitet an ihrer Schnittmenge: eine distributionelle Engine, bewertet auf Kompetenz im Sprachspiel der jeweiligen Zielsprache. Knoten anklicken.",
        about_th_model:"Modell", about_th_role:"Rolle", about_th_engine:"Engine",
        about_role_translation:"Übersetzung", about_role_judge:"Nur Richter",
        about_role_local:"Lokale CPU",
        about_th_metric:"Metrik", about_th_formula:"Formel", about_th_weight:"Gewicht",
        about_score_winner:"Gewinner",
        about_sidebar_project_info:"Projektinfo",
        about_sidebar_status:"Status", about_sidebar_active:"Aktive Entwicklung",
        about_sidebar_target_langs:"Zielsprachen",
        about_sidebar_south_slavic:"Südslawisch", about_sidebar_west_germanic:"Westgermanisch", about_sidebar_romance:"Romanisch",
        about_sidebar_philosophy:"Philosophie",
        about_sidebar_philosophy_text:"Der Weg ist wichtiger als das Ziel. Die Pipeline, die wir aufbauen, ist generisch und weit über die Buchübersetzung hinaus anwendbar.<br><br>Buchenberg ist eine praktische Umsetzung der <strong>X-Ray-Haltung</strong> des Autors: die maschinelle Übersetzung nicht als schwarze Box zu behandeln, sondern Fenster hinein zu bauen — Schicht für Schicht, Score für Score.<br><br>— Flavio",
        about_sidebar_authorship:"Urheberschaft &amp; Zusammenarbeit",
        about_sidebar_authorship_text:"Buchenberg ist konzipiert, gestaltet und gepflegt von <strong>Flavio</strong> (fladroid). Die Philosophie, Methodik, Architektur und alle endgültigen Designentscheidungen des Projekts sind seine — und bleiben seine alleinige Verantwortung.<br><br>Das Projekt wird in fortlaufender Zusammenarbeit mit <strong><a href="https://claude.ai" target="_blank">Claude</a></strong> (Anthropic) aufgebaut — nicht als Code-Vervollständigungswerkzeug, sondern als Arbeitspartner über mehr als 60 dokumentierte Sessions: Implementierung, Debugging, Analyse und der konzeptionelle Dialog, der Seiten wie <em>Geometry of Meaning</em> und <em>Art</em> geprägt hat. Jede Session wird in <code>docs/sessions/</code> aufgezeichnet, wo beide Namen erscheinen — eine bewusste Entscheidung, im Geiste der X-Ray-Haltung dieses Projekts.<br><br><em>Flavio &amp; Claude · Buchenberg · 2026</em>" },
  it: { home:"Home", about:"Informazioni", stats:"Statistiche X-Ray", books:"Biblioteca",
        nlp:"NLP", reader:"Lettore", learn:"Impara", geometry:"Geometria", art:"Arte",
        stats_title:"Statistiche X-Ray",
        stats_subtitle:"Dati aggregati dalla pipeline Buchenberg — distribuzione dei vincitori, punteggi e copertura.",
        stats_total_sent:"Frasi tradotte totali",
        stats_total_books:"Libri nel corpus",
        stats_lang_combos:"Combinazioni lingua × libro",
        stats_avg_ts:"Punteggio medio (tutti)",
        stats_winners_title:"Distribuzione dei vincitori per modello",
        stats_winners_sub:"Con quale frequenza vince ogni modello — su tutti i libri e le lingue.",
        stats_coverage_title:"Copertura per libro e lingua",
        stats_coverage_sub:"Numero di frasi tradotte per combinazione libro/lingua.",
        stats_score_title:"Punteggi medi per lingua",
        stats_score_sub:"Punteggio medio di traduzione e del giudice per lingua (tutti i libri). Più alto è meglio; max 1,0.",
        stats_col_model:"Modello", stats_col_wins:"Vittorie", stats_col_dist:"Distribuzione",
        stats_col_book:"Libro", stats_col_lang:"Lingua", stats_col_sent:"Frasi",
        stats_col_avg_ts:"Punteggio medio di traduzione", stats_col_avg_j:"Punteggio medio del giudice",
        stats_warning:"⚠ Le statistiche sono calcolate lato client dagli stessi file JSON usati dal Reader. Le informazioni sul modello vincitore richiedono i dati del giudice (judge_avg). Le frasi senza dati del giudice sono escluse dalle medie.",
        books_title:"Libri tradotti",
        books_subtitle:"Tutti i libri provengono da Project Gutenberg (pubblico dominio). Ogni traduzione è un ibrido a livello di frase prodotto dalla pipeline Buchenberg.",
        books_lbl_sentences:"frasi", books_lbl_languages:"lingue",
        books_btn_read:"Leggi", books_btn_gutenberg:"Gutenberg", books_btn_ner:"NER", books_btn_wordcloud:"Nuvola di parole",
        books_coming_soon:"prossimamente",
        books_wc_compare:"Confronta con:", books_wc_loading:"Creazione nuvola…",
        books_wc_coverage:"{n} di {total} frasi tradotte ({pct}%) — la nuvola riflette solo il campione tradotto",
        books_wc_en_full:"EN — Testo completo ({n} frasi)",
        books_wc_tr_sample:"{lang} — {n} frasi tradotte",
        index_tagline:"Pipeline open-source di traduzione automatica per la letteratura classica",
        index_hero_desc:`Buchenberg è un progetto di ricerca che traduce libri di pubblico dominio da
      <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a> in più lingue
      usando modelli open-source — misurando e classificando automaticamente la qualità della traduzione, frase per frase.<br><br>
      Il nome <strong>Buchenberg</strong> è un deliberato richiamo a <strong>Gutenberg</strong> —
      nello spirito del progetto originale, esteso nell'era della traduzione automatica.
      <em>Buch</em> in tedesco significa libro; il suffisso <em>-enberg</em> ci lega alla nostra fonte.`,
        index_sec_how:"Come funziona",
        index_how_desc:`Ogni frase di un libro sorgente viene tradotta usando tre modelli diversi —
      <strong>Gemma 3 12B</strong>, <strong>Ministral 3 14B</strong> e <strong>NLLB-600M</strong> —
      a varie temperature. Le traduzioni vengono poi ritradotte in inglese e confrontate con l'originale
      tramite <strong>similarità coseno</strong> su embedding multilingui.
      Un quarto modello, <strong>Gemma 4 31B</strong>, agisce da giudice cieco —
      valutando grammatica, naturalezza e fedeltà.
      Il vincitore per frase è scelto combinando entrambi i punteggi.
      Il documento finale è un ibrido: la migliore traduzione per ogni frase, indipendentemente dal modello.`,
        index_pillar_bt:"Traduci nella lingua target, poi ritraduce in inglese. Misura la similarità coseno tra originale e testo ritradotto. Un punteggio alto significa che il significato è stato preservato.",
        index_pillar_judge:"Gemma 4 31B valuta ogni traduzione candidata alla cieca su tre assi: grammatica, naturalezza e fedeltà all'originale. Il punteggio del giudice pesa il 60% del ranking finale.",
        index_pillar_winner:"Nessun modello vince ogni frase. Il documento finale combina la traduzione con il punteggio più alto per ogni frase — un ibrido che supera qualsiasi modello individuale.",
        index_sec_status:"Stato attuale",
        index_lbl_books:"Libri nel corpus", index_lbl_langs:"Lingue target",
        index_lbl_sentences:"Frasi tradotte", index_lbl_models:"Modelli di traduzione",
        index_cta_books:"Esplora la biblioteca", index_cta_about:"Informazioni", index_cta_stats:"Statistiche X-Ray",
        index_opensource:`<strong>100% open source.</strong> Tutti i modelli usati sono liberamente disponibili. Nessuna API proprietaria, nessun servizio di traduzione cloud.
      I libri sorgente provengono da <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a> — pubblico dominio, liberamente distribuibili.
      La pipeline gira su hardware comune con un backend PostgreSQL e
      <a href="https://ollama.com" target="_blank">Ollama</a> per l'inferenza LLM locale e cloud.`,
        nlp_title:"Elaborazione del linguaggio naturale",
        nlp_subtitle:"Nuvola di parole e analisi delle entità nei testi originali inglesi.",
        nlp_book_label:"Libro:",
        nlp_wc_title:"Nuvola di parole — EN Originale",
        nlp_ner_title:"Entità nominate", nlp_text_title:"Testo originale",
        nlp_net_title:"Rete di entità", nlp_click_hint:"Clicca un'entità per evidenziare le frasi",
        nlp_links_title:"Collegamenti tra entità", nlp_conflicts_title:"Conflitti di tipo",
        nlp_conflicts_sub:"Entità classificate con più tipi",
        nlp_th_from:"Da", nlp_th_to:"A", nlp_th_weight:"Legami",
        nlp_th_entity:"Entità", nlp_th_types:"Tipi",
        nlp_tip_all:"Tutte", nlp_tip_person:"Persona", nlp_tip_place:"Luogo", nlp_tip_org:"Org",
        about_title:"Informazioni su Buchenberg",
        about_h_name:"Il nome", about_h_problem:"Il problema", about_h_pipeline:"La pipeline",
        about_h_models:"Modelli", about_h_llm_nllb:"LLM vs. NLLB — due tipi di macchina diversi",
        about_h_embeddings:"Embedding", about_h_scoring:"Punteggio",
        about_h_infrastructure:"Infrastruttura", about_h_source:"Materiale sorgente",
        about_h_learnings:"Risultati chiave",
        about_h_lineage:"Lineage — dal Tractatus a Buchenberg",
        about_pipeline_intro:"Ogni frase attraversa le seguenti fasi:",
        about_pipeline_outro:"Lo stesso processo viene ripetuto con più modelli e temperature. Il vincitore per ogni frase è il candidato con il final_score più alto. Il documento esportato è un ibrido — la migliore traduzione per frase, indipendentemente dal modello.",
        about_p_name:"<strong>Buchenberg</strong> è un deliberato richiamo a <strong>Gutenberg</strong> — il progetto che ha reso milioni di libri di pubblico dominio liberamente disponibili a chiunque abbia una connessione internet. <em>Buch</em> è tedesco per libro. Il suffisso <em>-enberg</em> è un legame diretto con la nostra fonte e un omaggio a Johannes Gutenberg, la cui stampa ha democratizzato l’accesso alla parola scritta. Buchenberg cerca di fare lo stesso per la traduzione.",
        about_p_problem:"Come si valuta la qualità della traduzione automatica quando non si conosce la lingua target? Le metriche standard come BLEU richiedono traduzioni di riferimento umane, costose e non disponibili per la maggior parte delle coppie di lingue. Buchenberg usa un approccio diverso: <strong>back-translation scoring</strong> combinato con un <strong>giudice LLM cieco</strong>.",
        about_p_llm1:"Gemma e Ministral sono <strong>LLM</strong> — modelli linguistici generalisti con miliardi di parametri, addestrati su un’ampia fetta di testo umano. La traduzione è solo una delle molte cose che possono fare. Generano testo parola per parola, e l’impostazione della temperatura controlla quanto sono creativi: valori più alti producono formulazioni più libere e naturali — a rischio di allontanarsi dall’originale.",
        about_p_llm2:"<strong>NLLB</strong> è l’opposto: uno specialista. Costruito da Meta specificamente per la traduzione tra 200 lingue, non fa altro. È 20&times; più piccolo (600M parametri), gira su una CPU normale, e a temperatura 0,0 è completamente deterministico — la stessa frase produce sempre la stessa traduzione, di solito molto letterale.",
        about_p_llm3:"Ecco perché la competizione funziona: gli LLM portano naturalezza e fluidità, NLLB porta affidabilità e fedeltà letterale. Il giudice decide, frase per frase, quale virtù conta di più.",
        about_p_embeddings:"La similarità coseno è calcolata usando <strong>multilingual-e5-large</strong> (1024 dimensioni), un modello di embedding di frasi multilingue che funziona su tutte le lingue target. Una versione precedente usava MiniLM-L12, ma si è rivelato distorto verso le traduzioni letterali, favorendo sistematicamente NLLB rispetto agli output più naturali. e5-large produce ranking più equilibrati.",
        about_p_infrastructure:"La pipeline gira su due server domestici: <strong>foxuno</strong> (sviluppo, script Python, git) e <strong>balsam</strong> (PostgreSQL in Docker). Non è richiesta alcuna GPU — tutta l’inferenza cloud passa per Ollama Cloud; NLLB gira localmente su CPU. È intenzionale: Buchenberg è progettato per funzionare senza hardware costoso.",
        about_p_source:"Tutti i libri provengono da <a href="https://www.gutenberg.org" target="_blank">Project Gutenberg</a>, che fornisce accesso gratuito a oltre 70.000 opere di pubblico dominio. Buchenberg usa solo libri il cui copyright è scaduto — le traduzioni prodotte dalla pipeline sono quindi anch’esse liberamente distribuibili.",
        about_p_learnings_intro:"Durante lo sviluppo sono emersi diversi risultati non ovvi:",
        about_li_metric:"<strong>Metrica ≠ qualità.</strong> Le traduzioni naturali in stile DeepL ottenevano punteggi inferiori rispetto a quelle letterali con MiniLM. La metrica misurava la letteralità, non la qualità.",
        about_li_patterns:"<strong>I pattern del modello dipendono dal libro.</strong> La combinazione ottimale modello/temperatura varia tra libri e lingue — nessuna impostazione singola domina.",
        about_li_metadata:"<strong>s1–s3 sono sempre metadati</strong> (titolo, sottotitolo, autore) e dovrebbero essere esclusi dall’analisi significativa dei punteggi.",
        about_li_batch:"<strong>L’elaborazione batch richiede un fallback attento.</strong> Gli LLM a volte restituiscono il numero sbagliato di segmenti; un fallback a singola frase è essenziale.",
        about_p_lineage:"Due teorie del significato hanno prodotto due storie della traduzione automatica. Il primo Wittgenstein sosteneva che il significato è <strong>forma</strong> — il linguaggio rispecchia la realtà — una visione che attraverso la grammatica universale di Chomsky ha portato alla MT basata su regole, naufragata con il rapporto ALPAC nel 1966. Il tardo Wittgenstein sosteneva che il significato è <strong>uso</strong> — una visione che attraverso la semantica distribuzionale di Firth ha portato a word2vec, attention e NLLB. Buchenberg lavora alla loro intersezione: un motore distribuzionale, giudicato per competenza nel gioco linguistico di ogni lingua target. Clicca su un nodo.",
        about_th_model:"Modello", about_th_role:"Ruolo", about_th_engine:"Engine",
        about_role_translation:"Traduzione", about_role_judge:"Solo giudice",
        about_role_local:"CPU locale",
        about_th_metric:"Metrica", about_th_formula:"Formula", about_th_weight:"Peso",
        about_score_winner:"vincitore",
        about_sidebar_project_info:"Info progetto",
        about_sidebar_status:"Stato", about_sidebar_active:"Sviluppo attivo",
        about_sidebar_target_langs:"Lingue target",
        about_sidebar_south_slavic:"Slavo meridionale", about_sidebar_west_germanic:"Germanico occidentale", about_sidebar_romance:"Romanzo",
        about_sidebar_philosophy:"Filosofia",
        about_sidebar_philosophy_text:"Il percorso conta più della destinazione. La pipeline che stiamo costruendo è generica e applicabile ben oltre la traduzione di libri.<br><br>Buchenberg è un’implementazione pratica dell’<strong>atteggiamento X-Ray</strong> dell’autore: rifiutare di trattare la traduzione automatica come una scatola nera e costruire finestre al suo interno — strato per strato, punteggio per punteggio.<br><br>— Flavio",
        about_sidebar_authorship:"Paternità e collaborazione",
        about_sidebar_authorship_text:"Buchenberg è concepito, progettato e mantenuto da <strong>Flavio</strong> (fladroid). La filosofia, la metodologia, l’architettura e tutte le decisioni di design finali del progetto sono sue — e rimangono sua esclusiva responsabilità.<br><br>Il progetto è costruito in collaborazione continua con <strong><a href="https://claude.ai" target="_blank">Claude</a></strong> (Anthropic) — non come strumento di completamento del codice, ma come partner di lavoro attraverso più di 60 sessioni documentate: implementazione, debugging, analisi e il dialogo concettuale che ha plasmato pagine come <em>Geometry of Meaning</em> e <em>Art</em>. Ogni sessione è registrata in <code>docs/sessions/</code>, dove compaiono entrambi i nomi — una scelta deliberata, nello spirito dell’atteggiamento X-Ray di questo progetto.<br><br><em>Flavio &amp; Claude · Buchenberg · 2026</em>" },
  hr: { home:"Početna", about:"O projektu", stats:"X-Ray Statistike", books:"Knjižnica",
        nlp:"NLP", reader:"Čitač", learn:"Učenje", geometry:"Geometrija", art:"Umjetnost",
        stats_title:"X-Ray Statistike",
        stats_subtitle:"Agregatni podaci iz Buchenberg pipeline-a — distribucija pobjednika, scoreovi i pokrivenost.",
        stats_total_sent:"Ukupno prevedenih rečenica",
        stats_total_books:"Knjige u korpusu",
        stats_lang_combos:"Kombinacije jezik × knjiga",
        stats_avg_ts:"Prosječni score prijevoda (sve)",
        stats_winners_title:"Distribucija pobjednika po modelu",
        stats_winners_sub:"Koliko često svaki model pobjeđuje — kroz sve knjige i jezike.",
        stats_coverage_title:"Pokrivenost po knjizi i jeziku",
        stats_coverage_sub:"Broj prevedenih rečenica po kombinaciji knjiga/jezik.",
        stats_score_title:"Prosječni scoreovi po jeziku",
        stats_score_sub:"Prosječni score prijevoda i sudije po jeziku (sve knjige zajedno). Više je bolje; maks. 1,0.",
        stats_col_model:"Model", stats_col_wins:"Pobjede", stats_col_dist:"Distribucija",
        stats_col_book:"Knjiga", stats_col_lang:"Jezik", stats_col_sent:"Rečenice",
        stats_col_avg_ts:"Prosječni score prijevoda", stats_col_avg_j:"Prosječni score sudije",
        stats_warning:"⚠ Statistike se računaju na strani klijenta iz istih JSON datoteka koje koristi Reader. Informacije o pobjedničkom modelu zahtijevaju podatke sudije (judge_avg). Rečenice bez podataka sudije isključene su iz prosjeka.",
        books_title:"Prevedene knjige",
        books_subtitle:"Sve knjige dolaze s Project Gutenberga (javna domena). Svaki prijevod je hibrid na razini rečenica, proizveden Buchenberg pipelineom.",
        books_lbl_sentences:"rečenica", books_lbl_languages:"jezika",
        books_btn_read:"Čitaj", books_btn_gutenberg:"Gutenberg", books_btn_ner:"NER", books_btn_wordcloud:"Oblak riječi",
        books_coming_soon:"uskoro",
        books_wc_compare:"Usporedi s:", books_wc_loading:"Gradim oblak…",
        books_wc_coverage:"{n} od {total} rečenica prevedeno ({pct}%) — oblak prikazuje samo prevedeni uzorak",
        books_wc_en_full:"EN — Cijeli tekst ({n} rečenica)",
        books_wc_tr_sample:"{lang} — {n} prevedenih rečenica",
        index_tagline:"Open-source pipeline za strojno prevođenje klasične književnosti",
        index_hero_desc:`Buchenberg je istraživački projekt koji prevodi knjige iz javne domene s
      <a href="https://www.gutenberg.org" target="_blank">Project Gutenberga</a> na više jezika
      koristeći open-source modele — te automatski mjeri i rangira kvalitetu prijevoda, rečenicu po rečenicu.<br><br>
      Naziv <strong>Buchenberg</strong> je namjerni odjek <strong>Gutenberga</strong> —
      u duhu izvornog projekta, proširen u doba strojnog prevođenja.
      <em>Buch</em> je na njemačkom knjiga; sufiks <em>-enberg</em> veže nas uz naš izvor.`,
        index_sec_how:"Kako funkcionira",
        index_how_desc:`Svaka rečenica izvorne knjige prevodi se pomoću tri modela —
      <strong>Gemma 3 12B</strong>, <strong>Ministral 3 14B</strong> i <strong>NLLB-600M</strong> —
      pri različitim temperaturama. Prijevodi se zatim back-transliraju na engleski i uspoređuju s originalom
      pomoću <strong>kosinusne sličnosti</strong> na višejezičnim embeddingima.
      Četvrti model, <strong>Gemma 4 31B</strong>, djeluje kao slijepi sudac —
      ocjenjuje gramatiku, prirodnost i vjernost originalu.
      Pobjednik po rečenici bira se kombinacijom oba scorea.
      Konačni dokument je hibrid: najbolji prijevod za svaku rečenicu, bez obzira na model.`,
        index_pillar_bt:"Prevedi na ciljni jezik, zatim natrag na engleski. Izmjeri kosinusnu sličnost između originala i back-transliranog teksta. Visok score znači da je značenje sačuvano.",
        index_pillar_judge:"Gemma 4 31B ocjenjuje svaki prijevod slijepo po tri osi: gramatika, prirodnost i vjernost originalu. Score sudije nosi 60% težine u finalnom rangiranju.",
        index_pillar_winner:"Nijedan model ne pobjeđuje u svakoj rečenici. Konačni dokument kombinira prijevod s najvišim scoreom po rečenici — hibrid koji nadmašuje svaki pojedinačni model.",
        index_sec_status:"Trenutno stanje",
        index_lbl_books:"Knjige u korpusu", index_lbl_langs:"Ciljni jezici",
        index_lbl_sentences:"Prevedenih rečenica", index_lbl_models:"Modeli prevođenja",
        index_cta_books:"Prelistaj knjižnicu", index_cta_about:"O projektu", index_cta_stats:"X-Ray statistike",
        index_opensource:`<strong>100% open source.</strong> Svi korišteni modeli su slobodno dostupni. Bez vlasničkih API-ja, bez cloud usluga prevođenja.
      Izvorne knjige dolaze s <a href="https://www.gutenberg.org" target="_blank">Project Gutenberga</a> — javna domena, slobodno distribuirane.
      Pipeline radi na standardnom hardveru s PostgreSQL backendom i
      <a href="https://ollama.com" target="_blank">Ollama</a> za lokalnu i cloud LLM inferenciju.`,
        nlp_title:"Obrada prirodnog jezika",
        nlp_subtitle:"Oblak riječi i analiza imenovanih entiteta originalnih engleskih tekstova.",
        nlp_book_label:"Knjiga:",
        nlp_wc_title:"Oblak riječi — EN Original",
        nlp_ner_title:"Imenovani entiteti", nlp_text_title:"Originalni tekst",
        nlp_net_title:"Mreža entiteta", nlp_click_hint:"Klikni entitet za isticanje rečenica",
        nlp_links_title:"Veze između entiteta", nlp_conflicts_title:"Konflikti tipova",
        nlp_conflicts_sub:"Entiteti s više klasificiranih tipova",
        nlp_th_from:"Od", nlp_th_to:"Do", nlp_th_weight:"Veze",
        nlp_th_entity:"Entitet", nlp_th_types:"Tipovi",
        nlp_tip_all:"Sve", nlp_tip_person:"Osoba", nlp_tip_place:"Mjesto", nlp_tip_org:"Org",
        about_title:"O Buchenbergu",
        about_h_name:"Naziv", about_h_problem:"Problem", about_h_pipeline:"Pipeline",
        about_h_models:"Modeli", about_h_llm_nllb:"LLM vs. NLLB — dvije vrste strojeva",
        about_h_embeddings:"Embeddingi", about_h_scoring:"Bodovanje",
        about_h_infrastructure:"Infrastruktura", about_h_source:"Izvorna građa",
        about_h_learnings:"Ključne spoznaje",
        about_h_lineage:"Lineage — od Tractatusa do Buchenberga",
        about_pipeline_intro:"Svaka rečenica prolazi kroz sljedeće faze:",
        about_pipeline_outro:"Isti postupak se ponavlja s više modela i temperatura. Pobjednik za svaku rečenicu je kandidat s najvišim final_score-om. Izvezeni dokument je hibrid — najbolji prijevod po rečenici, bez obzira koji ga je model proizveo.",
        about_p_name:"<strong>Buchenberg</strong> je namjerni odjek <strong>Gutenberga</strong> — projekta koji je milijune knjiga iz javne domene učinio slobodno dostupnima svakome s internetskom vezom. <em>Buch</em> je njemački za knjiga. Sufiks <em>-enberg</em> izravna je veza s našim izvorom i naklon prema Johannesu Gutenbergu, čija je tiskara demokratizirala pristup pisanoj riječi. Buchenberg pokušava učiniti isto za prijevod.",
        about_p_problem:"Kako procijeniti kvalitetu strojnog prijevoda kada ne govoriš ciljni jezik? Standardne metrike poput BLEU-a zahtijevaju ljudske referentne prijevode, koji su skupi i nedostupni za većinu jezičnih parova. Buchenberg koristi drugačiji pristup: <strong>back-translation scoring</strong> kombiniran sa <strong>slijepim LLM sucem</strong>.",
        about_p_llm1:"Gemma i Ministral su <strong>LLM-ovi</strong> — modeli jezika opće namjene s milijardama parametara, trenirani na širokom presjeku ljudskih tekstova. Prevođenje je samo jedna od mnogih stvari koje mogu raditi. Generiraju tekst riječ po riječ, a postavka temperature kontrolira koliko su slobodni: više vrijednosti proizvode slobodnije, prirodnije formulacije — na rizik odmicanja od originala.",
        about_p_llm2:"<strong>NLLB</strong> je suprotnost: specijalist. Razvijen od Meta specifično za prijevod između 200 jezika, ne radi ništa drugo. 20× je manji (600M parametara), radi na običnom CPU-u, i pri temperaturi 0,0 je potpuno deterministički — ista rečenica uvijek daje isti prijevod, obično vrlo doslovan.",
        about_p_llm3:"Zato natjecanje funkcionira: LLM-ovi donose prirodnost i tečnost, NLLB donosi pouzdanost i doslovnu vjernost. Sudac odlučuje, rečenicu po rečenicu, koja vrlina je važnija.",
        about_p_embeddings:"Kosinusna sličnost izračunava se pomoću <strong>multilingual-e5-large</strong> (1024 dimenzije), višejezičnog modela za sentence embedding koji radi za sve ciljne jezike. Ranija verzija koristila je MiniLM-L12, ali se pokazalo da je pristrasan prema doslovnim prijevodima, sustavno favorizirajući NLLB nad prirodnijim rezultatima. e5-large proizvodi uravnoteženije rangove.",
        about_p_infrastructure:"Pipeline radi na dva kućna servera: <strong>foxuno</strong> (razvoj, Python skripte, git) i <strong>balsam</strong> (PostgreSQL u Dockeru). GPU nije potreban — sva cloud inferencija prolazi kroz Ollama Cloud; NLLB radi lokalno na CPU-u. To je namjerno: Buchenberg je dizajniran za rad bez skupog hardvera.",
        about_p_source:"Sve knjige dolaze s <a href="https://www.gutenberg.org" target="_blank">Project Gutenberga</a>, koji pruža slobodan pristup više od 70.000 djela iz javne domene. Buchenberg koristi samo knjige čija su autorska prava istekla — prijevodi koje pipeline proizvodi stoga su također slobodno distribuirani.",
        about_p_learnings_intro:"Tijekom razvoja pojavilo se nekoliko neočitih spoznaja:",
        about_li_metric:"<strong>Metrika ≠ kvaliteta.</strong> DeepL-style prirodni prijevodi imali su niže scoreove od doslovnih pod MiniLM-om. Metrika je mjerila doslovnost, ne kvalitetu.",
        about_li_patterns:"<strong>Uzorci modela ovise o knjizi.</strong> Optimalna kombinacija modela i temperature razlikuje se između knjiga i jezika — niti jedna postavka ne dominira.",
        about_li_metadata:"<strong>s1–s3 su uvijek metapodaci</strong> (naslov, podnaslov, autor) i trebaju biti isključeni iz smislene analize scoreova.",
        about_li_batch:"<strong>Batch obrada zahtijeva pažljiv fallback.</strong> LLM-ovi ponekad vraćaju pogrešan broj segmenata; fallback na jednu rečenicu je neophodan.",
        about_p_lineage:"Dvije teorije značenja proizvele su dvije povijesti strojnog prevođenja. Rani Wittgenstein tvrdio je da je značenje <strong>forma</strong> — jezik odražava stvarnost — pogled koji je kroz Chomskyjeve univerzalnu gramatiku doveo do pravilo-baziranog MT-a i srušio se s ALPAC izvještajem 1966. Kasni Wittgenstein tvrdio je da je značenje <strong>upotreba</strong> — pogled koji je kroz Firthovu distributivnu semantiku doveo do word2vec, attention i NLLB-a. Buchenberg radi na njihovom sjecištu: distributivni engine, ocjenjivan za kompetenciju u jezičnoj igri svakog ciljnog jezika. Klikni na čvor.",
        about_th_model:"Model", about_th_role:"Uloga", about_th_engine:"Engine",
        about_role_translation:"Prevođenje", about_role_judge:"Samo sudac",
        about_role_local:"Lokalni CPU",
        about_th_metric:"Metrika", about_th_formula:"Formula", about_th_weight:"Težina",
        about_score_winner:"pobjednik",
        about_sidebar_project_info:"Podaci o projektu",
        about_sidebar_status:"Status", about_sidebar_active:"Aktivni razvoj",
        about_sidebar_target_langs:"Ciljni jezici",
        about_sidebar_south_slavic:"Južnoslavenski", about_sidebar_west_germanic:"Zapadnogermanski", about_sidebar_romance:"Romanski",
        about_sidebar_philosophy:"Filozofija",
        about_sidebar_philosophy_text:"Put je važniji od cilja. Pipeline koji gradimo je generičan i primjenjiv daleko šire od prevođenja knjiga.<br><br>Buchenberg je praktična implementacija autorova <strong>X-Ray stava</strong>: odbijanje tretiranja strojnog prevođenja kao crne kutije i gradnja prozora u njega — sloj po sloj, score po score.<br><br>— Flavio",
        about_sidebar_authorship:"Autorstvo i suradnja",
        about_sidebar_authorship_text:"Buchenberg je osmislio, dizajnirao i održava <strong>Flavio</strong> (fladroid). Filozofija, metodologija, arhitektura i sve konačne dizajnerske odluke projekta su njegove — i ostaju njegova isključiva odgovornost.<br><br>Projekt se gradi u stalnoj suradnji s <strong><a href="https://claude.ai" target="_blank">Claudeom</a></strong> (Anthropic) — ne kao alat za dopunjavanje koda, već kao radni partner kroz više od 60 dokumentiranih sesija: implementacija, debugiranje, analiza i konceptualni dijalog koji je oblikovao stranice poput <em>Geometry of Meaning</em> i <em>Art</em>. Svaka sesija je zabilježena u <code>docs/sessions/</code>, gdje se pojavljuju oba imena — namjerni izbor, u duhu X-Ray stava ovog projekta.<br><br><em>Flavio &amp; Claude · Buchenberg · 2026</em>" },
  sr: { home:"Почетна", about:"О пројекту", stats:"X-Ray Статистике", books:"Библиотека",
        nlp:"NLP", reader:"Читач", learn:"Учење", geometry:"Геометрија", art:"Уметност",
        stats_title:"X-Ray Статистике",
        stats_subtitle:"Агрегатни подаци из Buchenberg pipeline-а — дистрибуција победника, скорови и покривеност.",
        stats_total_sent:"Укупно преведених реченица",
        stats_total_books:"Књиге у корпусу",
        stats_lang_combos:"Комбинације језик × књига",
        stats_avg_ts:"Просечни скор превода (све)",
        stats_winners_title:"Дистрибуција победника по моделу",
        stats_winners_sub:"Колико често сваки модел побеђује — кроз све књиге и језике.",
        stats_coverage_title:"Покривеност по књизи и језику",
        stats_coverage_sub:"Број преведених реченица по комбинацији књига/језик.",
        stats_score_title:"Просечни скорови по језику",
        stats_score_sub:"Просечни скор превода и судије по језику (све књиге заједно). Више је боље; макс. 1,0.",
        stats_col_model:"Модел", stats_col_wins:"Победе", stats_col_dist:"Дистрибуција",
        stats_col_book:"Књига", stats_col_lang:"Језик", stats_col_sent:"Реченице",
        stats_col_avg_ts:"Просечни скор превода", stats_col_avg_j:"Просечни скор судије",
        stats_warning:"⚠ Статистике се рачунају на страни клијента из истих JSON датотека које користи Reader. Информације о побједничком моделу захтијевају податке судије (judge_avg). Реченице без података судије искључене су из просјека.",
        books_title:"Преведене књиге",
        books_subtitle:"Све књиге потичу са Project Gutenberga (јавна домена). Сваки превод је хибрид на нивоу реченица, произведен Buchenberg пипелајном.",
        books_lbl_sentences:"реченица", books_lbl_languages:"језика",
        books_btn_read:"Читај", books_btn_gutenberg:"Gutenberg", books_btn_ner:"NER", books_btn_wordcloud:"Облак речи",
        books_coming_soon:"ускоро",
        books_wc_compare:"Упореди с:", books_wc_loading:"Градим облак…",
        books_wc_coverage:"{n} од {total} реченица преведено ({pct}%) — облак приказује само преведени узорак",
        books_wc_en_full:"EN — Цео текст ({n} реченица)",
        books_wc_tr_sample:"{lang} — {n} преведених реченица",
        index_tagline:"Open-source pipeline за машинско превођење класичне књижевности",
        index_hero_desc:`Buchenberg је истраживачки пројекат који преводи књиге из јавног домена са
      <a href="https://www.gutenberg.org" target="_blank">Project Gutenberga</a> на више језика
      користећи open-source моделе — и аутоматски мјери и рангира квалитет превода, реченицу по реченицу.<br><br>
      Назив <strong>Buchenberg</strong> је намјерни одјек <strong>Gutenberga</strong> —
      у духу оригиналног пројекта, прошириен у доба машинског превођења.
      <em>Buch</em> је на њемачком књига; суфикс <em>-enberg</em> везује нас за наш извор.`,
        index_sec_how:"Како функционише",
        index_how_desc:`Свака реченица изворне књиге преводи се помоћу три модела —
      <strong>Gemma 3 12B</strong>, <strong>Ministral 3 14B</strong> и <strong>NLLB-600M</strong> —
      при различитим температурама. Преводи се затим back-transliraju на енглески и пореде с оригиналом
      помоћу <strong>косинусне сличности</strong> на вишејезичним embeddingima.
      Четврти модел, <strong>Gemma 4 31B</strong>, дјелује као слијепи судија —
      оцјењује граматику, природност и вјерност оригиналу.
      Побједник по реченици бира се комбинацијом оба скора.
      Коначни документ је хибрид: најбољи превод за сваку реченицу, без обзира на модел.`,
        index_pillar_bt:"Преведи на циљни језик, затим назад на енглески. Измјери косинусну сличност између оригинала и back-transliranog текста. Висок скор значи да је значење сачувано.",
        index_pillar_judge:"Gemma 4 31B оцјењује сваки превод слијепо по три осе: граматика, природност и вјерност оригиналу. Скор судије носи 60% тежине у финалном рангирању.",
        index_pillar_winner:"Ниједан модел не побјеђује у свакој реченици. Коначни документ комбинује превод с највишим скором по реченици — хибрид који надмашује сваки појединачни модел.",
        index_sec_status:"Тренутно стање",
        index_lbl_books:"Књиге у корпусу", index_lbl_langs:"Циљни језици",
        index_lbl_sentences:"Преведених реченица", index_lbl_models:"Модели превођења",
        index_cta_books:"Прелистај библиотеку", index_cta_about:"О пројекту", index_cta_stats:"X-Ray статистике",
        index_opensource:`<strong>100% open source.</strong> Сви коришћени модели су слободно доступни. Без власничких API-ja, без cloud услуга превођења.
      Изворне књиге долазе са <a href="https://www.gutenberg.org" target="_blank">Project Gutenberga</a> — јавна домена, слободно дистрибуиране.
      Pipeline ради на стандардном хардверу с PostgreSQL backendom и
      <a href="https://ollama.com" target="_blank">Ollama</a> за локалну и cloud LLM inferenciju.`,
        nlp_title:"Обрада природног језика",
        nlp_subtitle:"Облак речи и анализа именованих ентитета оригиналних енглеских текстова.",
        nlp_book_label:"Књига:",
        nlp_wc_title:"Облак речи — EN Original",
        nlp_ner_title:"Именовани ентитети", nlp_text_title:"Оригинални текст",
        nlp_net_title:"Мрежа ентитета", nlp_click_hint:"Кликни ентитет за истицање реченица",
        nlp_links_title:"Везе између ентитета", nlp_conflicts_title:"Конфликти типова",
        nlp_conflicts_sub:"Ентитети с више класификованих типова",
        nlp_th_from:"Од", nlp_th_to:"До", nlp_th_weight:"Везе",
        nlp_th_entity:"Ентитет", nlp_th_types:"Типови",
        nlp_tip_all:"Све", nlp_tip_person:"Особа", nlp_tip_place:"Место", nlp_tip_org:"Орг",
        about_title:"О Buchenbergu",
        about_h_name:"Назив", about_h_problem:"Проблем", about_h_pipeline:"Pipeline",
        about_h_models:"Модели", about_h_llm_nllb:"LLM vs. NLLB — двије врсте машина",
        about_h_embeddings:"Embeddingi", about_h_scoring:"Бодовање",
        about_h_infrastructure:"Инфраструктура", about_h_source:"Изворна грађа",
        about_h_learnings:"Кључне спознаје",
        about_h_lineage:"Lineage — од Tractatusa до Buchenberga",
        about_pipeline_intro:"Свака реченица пролази кроз сљедеће фазе:",
        about_pipeline_outro:"Исти поступак се понавља с више модела и температура. Побједник за сваку реченицу је кандидат с највишим final_score-om. Извезени документ је хибрид — најбољи превод по реченици, без обзира који га је модел произвео.",
        about_p_name:"<strong>Buchenberg</strong> је намјерни одјек <strong>Gutenberga</strong> — пројекта који је милионе књига из јавног домена учинио слободно доступним свакоме с интернетском везом. <em>Buch</em> је њемачки за књига. Суфикс <em>-enberg</em> директна је веза с нашим извором и наклон према Johannesu Gutenbergu, чија је штампарска преса демократизирала приступ писаној ријечи. Buchenberg покушава учинити исто за превод.",
        about_p_problem:"Како процијенити квалитет машинског превода када не говориш циљни језик? Стандардне метрике попут BLEU-a захтијевају људске референтне преводе, који су скупи и недоступни за већину језичних парова. Buchenberg користи другачији приступ: <strong>back-translation scoring</strong> комбинован са <strong>slијепим LLM судијом</strong>.",
        about_p_llm1:"Gemma и Ministral су <strong>LLM-ови</strong> — модели језика опће намјене с милијардама параметара, тренирани на широком пресјеку људских текстова. Превођење је само једна од многих ствари које могу радити. Генеришу текст ријеч по ријеч, а поставка температуре контролише колико су слободни: више вриједности производе слободније, природније формулације — на ризик одмицања од оригинала.",
        about_p_llm2:"<strong>NLLB</strong> је супротност: специјалист. Развијен од Meta специфично за превод између 200 језика, не ради ништа друго. 20&times; је мањи (600M параметара), ради на обичном CPU-u, и при температури 0,0 је потпуно детерминистички — иста реченица увијек даје исти превод, обично врло досљедан.",
        about_p_llm3:"Зато такмичење функционише: LLM-ови доносе природност и течност, NLLB доноси поузданост и досљедну вјерност. Судија одлучује, реченицу по реченицу, која врлина је важнија.",
        about_p_embeddings:"Косинусна сличност израчунава се помоћу <strong>multilingual-e5-large</strong> (1024 димензије), вишејезичног модела за sentence embedding који ради за све циљне језике. Ранија верзија користила је MiniLM-L12, али се показало да је пристрасан према досљедним преводима, систематски фаворизујући NLLB над природнијим резултатима. e5-large производи уравнотеженије рангове.",
        about_p_infrastructure:"Pipeline ради на два кућна сервера: <strong>foxuno</strong> (развој, Python скрипте, git) и <strong>balsam</strong> (PostgreSQL у Dockeru). GPU није потребан — сва cloud inferencija пролази кроз Ollama Cloud; NLLB ради локално на CPU-u. То је намјерно: Buchenberg је дизајниран за рад без скупог хардвера.",
        about_p_source:"Све књиге долазе са <a href="https://www.gutenberg.org" target="_blank">Project Gutenberga</a>, који пружа слободан приступ више од 70.000 дјела из јавног домена. Buchenberg користи само књиге чија су ауторска права истекла — преводи које pipeline производи стога су такођер слободно дистрибуирани.",
        about_p_learnings_intro:"Током развоја појавило се неколико неочитих спознаја:",
        about_li_metric:"<strong>Метрика ≠ квалитет.</strong> DeepL-style природни преводи имали су ниже скорове од досљедних под MiniLM-om. Метрика је мјерила досљедност, не квалитет.",
        about_li_patterns:"<strong>Узорци модела зависе од књиге.</strong> Оптимална комбинација модела и температуре разликује се између књига и језика — ниједна поставка не доминира.",
        about_li_metadata:"<strong>s1–s3 су увијек метаподаци</strong> (наслов, поднаслов, аутор) и требају бити искључени из смислене анализе скорова.",
        about_li_batch:"<strong>Batch обрада захтијева пажљив fallback.</strong> LLM-ови понекад враћају погрешан број сегмената; fallback на једну реченицу је неопходан.",
        about_p_lineage:"Двије теорије значења произвеле су двије историје машинског превођења. Рани Wittgenstein тврдио је да је значење <strong>форма</strong> — језик одражава стварност — поглед који је кроз Chomskyjeve универзалну граматику довео до правило-базираног MT-a и срушио се са ALPAC извјештајем 1966. Касни Wittgenstein тврдио је да је значење <strong>употреба</strong> — поглед који је кроз Firthovu дистрибутивну семантику довео до word2vec, attention и NLLB-a. Buchenberg ради на њиховом сјецишту: дистрибутивни engine, оцјењиван за компетенцију у језичкој игри сваког циљног језика. Кликни на чвор.",
        about_th_model:"Модел", about_th_role:"Улога", about_th_engine:"Engine",
        about_role_translation:"Превођење", about_role_judge:"Само судија",
        about_role_local:"Локални CPU",
        about_th_metric:"Метрика", about_th_formula:"Формула", about_th_weight:"Тежина",
        about_score_winner:"побједник",
        about_sidebar_project_info:"Подаци о пројекту",
        about_sidebar_status:"Статус", about_sidebar_active:"Активни развој",
        about_sidebar_target_langs:"Циљни језици",
        about_sidebar_south_slavic:"Јужнославенски", about_sidebar_west_germanic:"Западногермански", about_sidebar_romance:"Романски",
        about_sidebar_philosophy:"Филозофија",
        about_sidebar_philosophy_text:"Пут је важнији од циља. Pipeline који градимо је генерички и примјењљив далеко шире од превођења књига.<br><br>Buchenberg је практична имплементација ауторовог <strong>X-Ray става</strong>: одбијање третирања машинског превођења као црне кутије и градња прозора у њу — слој по слој, скор по скор.<br><br>— Flavio",
        about_sidebar_authorship:"Ауторство и сарадња",
        about_sidebar_authorship_text:"Buchenberg је осмислио, дизајнирао и одржава <strong>Flavio</strong> (fladroid). Филозофија, методологија, архитектура и све коначне дизајнерске одлуке пројекта су његове — и остају његова искључива одговорност.<br><br>Пројекат се гради у сталној сарадњи са <strong><a href="https://claude.ai" target="_blank">Claudeom</a></strong> (Anthropic) — не као алат за допуњавање кода, већ као радни партнер кроз више од 60 документованих сесија: имплементација, дебаговање, анализа и концептуални дијалог који је обликовао странице попут <em>Geometry of Meaning</em> и <em>Art</em>. Свака сесија је забиљежена у <code>docs/sessions/</code>, гдје се појављују оба имена — намјерни избор, у духу X-Ray става овог пројекта.<br><br><em>Flavio &amp; Claude · Buchenberg · 2026</em>" },
};

const NAV_LINKS = [
  { key:"home",     href:"index.html" },
  { key:"about",    href:"about.html" },
  { key:"stats",    href:"stats.html" },
  { key:"books",    href:"books.html" },
  { key:"nlp",      href:"nlp.html" },
  { key:"reader",   href:"reader.html" },
  { key:"learn",    href:"learn.html" },
  { key:"geometry", href:"geometry.html" },
  { key:"art",      href:"art.html" },
];

const LANG_LABELS = { en:'EN', de:'DE', it:'IT', hr:'HR', sr:'SR' };

// Theme init ODMAH — sprečava flash
const savedTheme = localStorage.getItem('bb-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Lang init
let uiLang = localStorage.getItem('bb-ui-lang') || 'en';

// Globalni BB_NAV API za stranice
window.BB_NAV = {
  version: BB_VERSION + ' \u00b7 ' + BB_VERSION_DATE,
  getLang: () => uiLang,
  t: (key) => (NAV_I18N[uiLang] || NAV_I18N.en)[key] || key,
  onLangChange: null,
};

function currentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function buildHeaderHTML() {
  const navHTML = NAV_LINKS.map(l => {
    const active = (currentPage() === l.href) ? ' active' : '';
    return `<a href="${l.href}" class="bb-nav-link${active}" data-navkey="${l.key}">${(NAV_I18N[uiLang]||NAV_I18N.en)[l.key]}</a>`;
  }).join('\n      ');

  const optionsHTML = Object.entries(LANG_LABELS).map(([val, label]) =>
    `<option value="${val}"${uiLang===val?' selected':''}>${label}</option>`
  ).join('');

  return `<div id="bb-header"><div id="bb-header-inner">
    <a href="index.html" id="bb-logo">Buchenberg</a>
    <nav id="bb-nav">\n      ${navHTML}\n    </nav>
    <div id="bb-header-controls">
      <select id="bb-lang-select" title="UI language">${optionsHTML}</select>
      <button id="bb-theme-toggle" title="Toggle dark mode">${savedTheme==='dark'?'☀️':'🌙'}</button>
      <button id="bb-burger" title="Menu">☰</button>
    </div>
  </div></div>`;
}

// Ubaci header SINHRONO — document.write dok je parser aktivan
document.write(buildHeaderHTML());

// Nakon što se DOM učita — privežemo event listenere
document.addEventListener('DOMContentLoaded', function() {

  // Theme toggle
  document.getElementById('bb-theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bb-theme', next);
    document.getElementById('bb-theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // Burger (mobile)
  const burger = document.getElementById('bb-burger');
  const nav = document.getElementById('bb-nav');
  burger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.bb-nav-link').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open')));

  // Lang dropdown
  document.getElementById('bb-lang-select').addEventListener('change', function() {
    uiLang = this.value;
    localStorage.setItem('bb-ui-lang', uiLang);
    // Ažuriraj nav labele
    document.querySelectorAll('.bb-nav-link[data-navkey]').forEach(a => {
      a.textContent = (NAV_I18N[uiLang]||NAV_I18N.en)[a.dataset.navkey] || a.textContent;
    });
    // Obavijesti stranicu
    if (typeof window.BB_NAV.onLangChange === 'function') {
      window.BB_NAV.onLangChange(uiLang);
    }
  });

  // Key Concepts — about, geometry, art, nlp
  (function() {
    const CONCEPT_PAGES = ['about', 'geometry', 'art', 'nlp'];
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    if (!CONCEPT_PAGES.includes(page)) return;
    const footer = document.getElementById('bb-footer');
    if (!footer) return;
    fetch('data/concepts.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        const concepts = data[page];
        if (!concepts || !concepts.length) return;
        const section = document.createElement('section');
        section.id = 'bb-key-concepts';
        const title = document.createElement('div');
        title.className = 'bb-concepts-title';
        title.textContent = 'Key Concepts';
        section.appendChild(title);
        const grid = document.createElement('div');
        grid.className = 'bb-concepts-grid';
        concepts.forEach(function(c) {
          const card = document.createElement('div');
          card.className = 'bb-concept-card';
          card.innerHTML =
            '<span class="bb-concept-icon">' + c.icon + '</span>' +
            '<div class="bb-concept-body">' +
              '<a class="bb-concept-name" href="https://en.wikipedia.org/wiki/' + c.wiki + '" target="_blank" rel="noopener">' + c.name + '</a>' +
              '<span class="bb-concept-desc">' + c.description + '</span>' +
            '</div>';
          grid.appendChild(card);
        });
        section.appendChild(grid);
        footer.parentNode.insertBefore(section, footer);
      })
      .catch(function() {});
  })();

  // Footer — renderira se iz nav.js, HTML fajlovi imaju samo prazan <div id="bb-footer">
  const footer = document.getElementById('bb-footer');
  if (footer) {
    footer.innerHTML =
      '<div style="max-width:1200px;margin:0 auto;padding:0 16px;">' +
        'Buchenberg \u00b7 Open-source MT pipeline \u00b7 ' + BB_VERSION + ' (' + BB_VERSION_DATE + ')' +
      '</div>';
  }

});

})();
