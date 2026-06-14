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
        nlp_tip_all:"All", nlp_tip_person:"Person", nlp_tip_place:"Place", nlp_tip_org:"Org" },
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
        nlp_tip_all:"Alle", nlp_tip_person:"Person", nlp_tip_place:"Ort", nlp_tip_org:"Org" },
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
        nlp_tip_all:"Tutte", nlp_tip_person:"Persona", nlp_tip_place:"Luogo", nlp_tip_org:"Org" },
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
        nlp_tip_all:"Sve", nlp_tip_person:"Osoba", nlp_tip_place:"Mjesto", nlp_tip_org:"Org" },
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
        nlp_tip_all:"Све", nlp_tip_person:"Особа", nlp_tip_place:"Место", nlp_tip_org:"Орг" },
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
