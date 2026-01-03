// src/content/blog/posts.js

/**
 * Local blog source ("JSON in JS") - internal keys in ENGLISH.
 * UI labels are handled via next-intl messages.
 */

export const BLOG_LOCALES = ["de", "en", "es"];

export const BLOG_CATEGORIES = [
    "coaching",
    "beliefs",
    "transformation",
    "development",
    "mindfuck",
];

/**
 * @typedef {Object} BlogPost
 * @property {string} slug                               - unique, kebab-case
 * @property {typeof BLOG_CATEGORIES[number]} category    - internal key (EN)
 * @property {string} date                               - YYYY-MM-DD
 * @property {{de:string,en:string,es:string}} title
 * @property {{de:string,en:string,es:string}} excerpt
 * @property {{de:string,en:string,es:string}} readingTime
 * @property {{de:string[],en:string[],es:string[]}} content  - paragraphs
 * @property {{de?:string[],en?:string[],es?:string[]}} [tags]
 * @property {string} [cover]                            - optional: "/img/blog/xxx.jpg"
 */

export const blogPosts = /** @type {BlogPost[]} */ ([

    {
        slug: "wenn-dein-tiefpunkt-dein-wendepunkt-wird",
        category: "transformation",
        date: "2026-01-03",
        title: {
            de: "Wenn dein Tiefpunkt dein Wendepunkt wird",
            en: "When your lowest point becomes your turning point",
            es: "Cuando tu punto más bajo se convierte en tu punto de inflexión"
        },
        excerpt: {
            de: "Über innere Krisen, Bewusstsein und echte Veränderung – und warum der Wendepunkt oft leise beginnt.",
            en: "On inner crises, awareness, and real change – and why the turning point often begins quietly.",
            es: "Sobre las crisis internas, la conciencia y el cambio real — y por qué el punto de inflexión suele empezar en silencio."
        },
        readingTime: { de: "7 min", en: "7 min", es: "7 min" },
        cover: "/img/blog/PLACEHOLDER-COVER.webp",
        content: {
            de: [
                { type: "p", text: "Über innere Krisen, Bewusstsein und echte Veränderung" },

                {
                    type: "image",
                    src: "/img/blog/bandt02.webp",
                    alt: "Nebel im Wald",
                    caption: "IMAGE: Fog & forest (Kontrast reduzieren)."
                },

                {
                    type: "p",
                    text:
                        "Dieser Text ist für dich,\n" +
                        "wenn du gerade an einem Punkt stehst:\n\n" +
                        "in diesem Zwischenraum\n" +
                        "und nicht weisst, ob das ein Ende\n" +
                        "oder ein Anfang ist.\n\n" +
                        "Hier musst du nichts lösen.\n" +
                        "Du darfst einfach lesen."
                },

                { type: "h2", text: "Ein Tiefpunkt fühlt sich selten wie ein Anfang an" },
                {
                    type: "p",
                    text:
                        "Eher wie ein Versagen,\n" +
                        "wie Stillstand,\n" +
                        "wie der Moment,\n\n" +
                        "in dem etwas in dir aufgibt.\n" +
                        "Und genau deshalb übersehen wir oft,\n" +
                        "was er wirklich ist:"
                },
                { type: "quote", text: "Ein Wendepunkt" },
                { type: "p", text: "Nicht laut.\nNicht dramatisch.\nSondern leise und ehrlich." },

                { type: "h2", text: "Warum wir den Tiefpunkt fürchten" },
                { type: "p", text: "Wir haben gelernt, stark zu sein.\nDurchzuhalten.\nWeiterzumachen." },
                {
                    type: "p",
                    text:
                        "Ein Tiefpunkt widerspricht allem,\n" +
                        "was wir über Kontrolle, Erfolg\n" +
                        "und Selbstoptimierung gelernt haben.\n\n" +
                        "Er konfrontiert uns mit Fragen wie:"
                },
                {
                    type: "ul",
                    items: [
                        "Warum funktioniert es nicht mehr?",
                        "Warum reicht meine Kraft nicht aus?",
                        "Warum fühle ich mich so leer, obwohl „eigentlich alles okay“ sein sollte?"
                    ]
                },
                {
                    type: "p",
                    text:
                        "Der Schmerz liegt nicht nur\n" +
                        "im Erleben selbst,\n" +
                        "sondern darin,\n" +
                        "dass er nicht in unser Selbstbild passt."
                },

                { type: "h2", text: "Schmerz ist kein Zeichen von Schwäche, sondern von Wahrheit" },
                {
                    type: "p",
                    text:
                        "Psychologisch betrachtet ist Schmerz kein Gegner.\n" +
                        "Er ist ein Signal.\n\n" +
                        "Ein Hinweis darauf,\n" +
                        "dass etwas zu lange ignoriert,\n" +
                        "unterdrückt oder übergangen wurde:"
                },
                {
                    type: "ul",
                    items: [
                        "eigene Grenzen",
                        "unverarbeitete Gefühle",
                        "unerfüllte Bedürfnisse",
                        "innere Konflikte"
                    ]
                },
                {
                    type: "p",
                    text:
                        "Viele Menschen funktionieren jahrelang\n" +
                        "gegen sich selbst, bis das System nicht mehr mitmacht."
                },
                {
                    type: "quote",
                    text:
                        "Der Tiefpunkt ist nicht Zusammenbruch.\n" +
                        "Er ist der Moment, in dem die Wahrheit lauter wird\n" +
                        "als das Wegdrücken."
                },

                { type: "h2", text: "Warum Veränderung fast immer mit Schmerz beginnt" },
                { type: "p", text: "Echte Veränderung entsteht selten aus Comfort." },
                { type: "p", text: "Sie entsteht dort, wo Verdrängung nicht mehr möglich ist." },
                {
                    type: "p",
                    text:
                        "Der Tiefpunkt nimmt uns etwas:\n\n" +
                        "die Illusion von Kontrolle,\n" +
                        "alte Rollen,\n" +
                        "alte Strategien.\n\n" +
                        "Und genau dadurch entsteht Raum.\n" +
                        "Nicht sofort für Lösungen,\n" +
                        "aber für Ehrlichkeit.\n\n" +
                        "Und Ehrlichkeit ist der erste echte Schritt\n" +
                        "in Richtung Heilung."
                },

                {
                    type: "image",
                    src: "/img/blog/bandt01.webp",
                    alt: "Leafes",
                    caption: "BILD 2: Sheet (Kontrast reduzieren)."
                },

                { type: "h2", text: "Der Wendepunkt ist nicht äußerer Erfolg, sondern eine innere Entscheidung" },
                {
                    type: "p",
                    text:
                        "Viele schauen beim Wendepunkt auf das große Ereignis.\n\n" +
                        "Doch psychologisch geschieht er oft unscheinbar und leise.\n\n" +
                        "Er beginnt mit einem inneren Satz:"
                },
                { type: "quote", text: "„So wie es ist,\nkann es nicht bleiben.“" },
                { type: "p", text: "Oder:" },
                { type: "quote", text: "„Ich will mich selbst\nnicht länger verlieren.“" },
                {
                    type: "p",
                    text:
                        "In diesem Moment\n" +
                        "verschiebt sich etwas Grundlegendes:\n\n" +
                        "Du hörst auf, dich gegen dein Empfinden zu stellen,\n" +
                        "und beginnst, dich ernst zu nehmen.\n\n" +
                        "Das ist Selbstermächtigung.\n" +
                        "Nicht laut, aber tiefgreifend."
                },

                { type: "h2", text: "Heilung bedeutet nicht, dass der Schmerz sofort verschwindet" },
                { type: "p", text: "Ein häufiger Irrtum:" },
                { type: "p", text: "Heilung heisst nicht,\ndass es nie wieder weh tut." },
                { type: "p", text: "Heilung bedeutet:" },
                {
                    type: "ul",
                    items: [
                        "du hörst hin, statt dich zu übergehen",
                        "du bleibst präsent, statt zu fliehen",
                        "du begegnest dir selbst mit Verantwortung und Mitgefühl"
                    ]
                },
                {
                    type: "p",
                    text:
                        "Der Schmerz verliert seine Macht,\n" +
                        "wenn er nicht mehr bekämpft werden muss.\n\n" +
                        "Dann wird er zum Wegweiser."
                },

                { type: "h2", text: "Wenn du gerade an deinem Tiefpunkt stehst" },
                { type: "p", text: "Du bist nicht gescheitert.\nDu bist nicht zu schwach.\nUnd du bist nicht „falsch“." },
                {
                    type: "p",
                    text:
                        "Vielleicht bist du genau dort angekommen,\n\n" +
                        "wo dein Leben ehrlicher werden will.\n\n" +
                        "Der Tiefpunkt ist oft der Moment,\n" +
                        "in dem du aufhörst,\n" +
                        "dich selbst zu verraten,\n" +
                        "und Raum entsteht für Neues.\n\n" +
                        "Und genau das\n" +
                        "macht ihn zu einem Wendepunkt."
                },

                { type: "h2", text: "Self-reflection" },
                { type: "p", text: "3 Questions with Effect" },
                {
                    type: "p",
                    text:
                        "Wenn dich dieser Text berührt,\n" +
                        "nimm dir einen Moment\n" +
                        "für diese Fragen:"
                },
                {
                    type: "ul",
                    items: [
                        "Was in meinem Leben fühlt sich nicht mehr stimmig an?",
                        "Wo halte ich an etwas fest, das mich Kraft kostet?",
                        "Was wäre möglich, wenn ich mich selbst ernster nehme als meine Angst?"
                    ]
                },

                { type: "h2", text: "Schmerz ist nicht das Ende, sondern der Übergang" },
                {
                    type: "p",
                    text:
                        "Ein Tiefpunkt ist kein Beweis dafür,\n" +
                        "dass du gescheitert bist.\n\n" +
                        "Er ist oft der Punkt,\n" +
                        "an dem du beginnst,\n" +
                        "dich selbst zurückzuholen.\n\n" +
                        "Nicht alles, was zerbricht, ist verkehrt.\n" +
                        "Manches zerbricht, damit etwas Neues entstehen kann.\n\n" +
                        "Und manchmal ist genau das,\n" +
                        "was sich gerade wie\n" +
                        "der schwerste Moment anfühlt,\n" +
                        "der Anfang deines neuen Weges."
                },
                {
                    type: "p",
                    text:
                        "Wenn du dich nach diesem Text\n" +
                        "nicht klarer, sondern stiller fühlst,\n" +
                        "dann ist das kein Rückschritt.\n\n" +
                        "Genau darum geht es\n" +
                        "im nächsten Beitrag:\n\n" +
                        "Der Wendepunkt beginnt leise.\n"
                }
            ],

            en: [
                { type: "p", text: "On inner crises, awareness, and real change" },

                {
                    type: "image",
                    src: "/img/blog/bandt02.webp",
                    alt: "Fog in a forest",
                    caption: "IMAGE: Fog & forest (reduce contrast)."
                },

                {
                    type: "p",
                    text:
                        "This text is for you\n" +
                        "if you’re standing at a point right now:\n\n" +
                        "in that in-between space\n" +
                        "and you don’t know whether it’s an end\n" +
                        "or a beginning.\n\n" +
                        "You don’t have to solve anything here.\n" +
                        "You’re allowed to simply read."
                },

                { type: "h2", text: "A low point rarely feels like a beginning" },
                {
                    type: "p",
                    text:
                        "More like failure,\n" +
                        "like stagnation,\n" +
                        "like the moment\n\n" +
                        "when something in you gives up.\n" +
                        "And that’s exactly why we often miss\n" +
                        "what it truly is:"
                },
                { type: "quote", text: "A turning point" },
                { type: "p", text: "Not loud.\nNot dramatic.\nBut quiet and honest." },

                { type: "h2", text: "Why we fear a low point" },
                { type: "p", text: "We learned to be strong.\nTo endure.\nTo keep going." },
                {
                    type: "p",
                    text:
                        "A low point contradicts everything\n" +
                        "we learned about control, success,\n" +
                        "and self-optimization.\n\n" +
                        "It confronts us with questions like:"
                },
                {
                    type: "ul",
                    items: [
                        "Why doesn’t it work anymore?",
                        "Why isn’t my strength enough?",
                        "Why do I feel so empty even though “everything should be fine”?"
                    ]
                },
                {
                    type: "p",
                    text:
                        "The pain isn’t only\n" +
                        "in the experience itself,\n" +
                        "but in the fact\n" +
                        "that it doesn’t fit our self-image."
                },

                { type: "h2", text: "Pain is not a sign of weakness — it’s a sign of truth" },
                {
                    type: "p",
                    text:
                        "Psychologically, pain isn’t the enemy.\n" +
                        "It’s a signal.\n\n" +
                        "A sign that something has been ignored,\n" +
                        "suppressed, or bypassed for too long:"
                },
                {
                    type: "ul",
                    items: [
                        "personal boundaries",
                        "unprocessed feelings",
                        "unmet needs",
                        "inner conflicts"
                    ]
                },
                {
                    type: "p",
                    text:
                        "Many people function for years\n" +
                        "against themselves until the system can’t keep up anymore."
                },
                {
                    type: "quote",
                    text:
                        "A low point is not a collapse.\n" +
                        "It’s the moment when truth becomes louder\n" +
                        "than pushing everything away."
                },

                { type: "h2", text: "Why change almost always begins with pain" },
                { type: "p", text: "Real change rarely comes from comfort." },
                { type: "p", text: "It begins where denial is no longer possible." },
                {
                    type: "p",
                    text:
                        "A low point takes something from us:\n\n" +
                        "the illusion of control,\n" +
                        "old roles,\n" +
                        "old coping strategies.\n\n" +
                        "And that’s exactly how space is created.\n" +
                        "Not immediately for solutions,\n" +
                        "but for honesty.\n\n" +
                        "And honesty is the first real step\n" +
                        "toward healing."
                },

                {
                    type: "image",
                    src: "/img/blog/bandt01.webp",
                    alt: "Leafes",
                    caption: "IMAGE 2: Sheet (reduce contrast)."
                },

                { type: "h2", text: "The turning point is not outer success — it’s an inner decision" },
                {
                    type: "p",
                    text:
                        "Many people look for the turning point in the big event.\n\n" +
                        "But psychologically, it often happens quietly and subtly.\n\n" +
                        "It begins with an inner sentence:"
                },
                { type: "quote", text: "“The way it is\ncannot stay this way.”" },
                { type: "p", text: "Or:" },
                { type: "quote", text: "“I don’t want\nto lose myself anymore.”" },
                {
                    type: "p",
                    text:
                        "In that moment,\n" +
                        "something fundamental shifts:\n\n" +
                        "You stop opposing what you feel,\n" +
                        "and you begin to take yourself seriously.\n\n" +
                        "That is self-empowerment.\n" +
                        "Not loud — but profound."
                },

                { type: "h2", text: "Healing doesn’t mean the pain disappears immediately" },
                { type: "p", text: "A common misunderstanding:" },
                { type: "p", text: "Healing doesn’t mean\nit will never hurt again." },
                { type: "p", text: "Healing means:" },
                {
                    type: "ul",
                    items: [
                        "you listen instead of overriding yourself",
                        "you stay present instead of escaping",
                        "you meet yourself with responsibility and compassion"
                    ]
                },
                {
                    type: "p",
                    text:
                        "Pain loses its power\n" +
                        "when it no longer has to be fought.\n\n" +
                        "Then it becomes a guide."
                },

                { type: "h2", text: "If you’re standing at your low point right now" },
                { type: "p", text: "You haven’t failed.\nYou’re not too weak.\nAnd you’re not “wrong”." },
                {
                    type: "p",
                    text:
                        "Maybe you’re exactly where\n\n" +
                        "your life wants to become more honest.\n\n" +
                        "A low point is often the moment\n" +
                        "when you stop betraying yourself\n" +
                        "and space opens for something new.\n\n" +
                        "And that’s exactly\n" +
                        "what makes it a turning point."
                },

                { type: "h2", text: "Self-reflection" },
                { type: "p", text: "3 questions with impact" },
                {
                    type: "p",
                    text:
                        "If this text touches you,\n" +
                        "take a moment\n" +
                        "for these questions:"
                },
                {
                    type: "ul",
                    items: [
                        "What in my life no longer feels aligned?",
                        "Where am I holding on to something that drains my energy?",
                        "What would be possible if I took myself more seriously than my fear?"
                    ]
                },

                { type: "h2", text: "Pain is not the end — it’s the transition" },
                {
                    type: "p",
                    text:
                        "A low point is not proof\n" +
                        "that you failed.\n\n" +
                        "It is often the point\n" +
                        "where you begin\n" +
                        "to bring yourself back.\n\n" +
                        "Not everything that breaks is wrong.\n" +
                        "Some things break so something new can emerge.\n\n" +
                        "And sometimes, what feels like\n" +
                        "the hardest moment\n" +
                        "is the beginning of your new path."
                },
                {
                    type: "p",
                    text:
                        "If after reading this\n" +
                        "you don’t feel clearer, but quieter,\n" +
                        "that’s not a setback.\n\n" +
                        "That’s exactly what the next post is about:\n\n" +
                        "The turning point begins quietly.\n"
                }
            ],

            es: [
                { type: "p", text: "Sobre las crisis internas, la conciencia y el cambio real" },

                {
                    type: "image",
                    src: "/img/blog/PLACEHOLDER-FOG-FOREST.webp",
                    alt: "Niebla en el bosque",
                    caption: "IMAGEN: Niebla y bosque (bajar contraste)."
                },

                {
                    type: "p",
                    text:
                        "Este texto es para ti\n" +
                        "si ahora mismo estás en un punto:\n\n" +
                        "en ese espacio intermedio\n" +
                        "y no sabes si es un final\n" +
                        "o un comienzo.\n\n" +
                        "Aquí no tienes que resolver nada.\n" +
                        "Puedes simplemente leer."
                },

                { type: "h2", text: "Un punto bajo rara vez se siente como un comienzo" },
                {
                    type: "p",
                    text:
                        "Más bien como un fracaso,\n" +
                        "como estancamiento,\n" +
                        "como el momento\n\n" +
                        "en el que algo dentro de ti se rinde.\n" +
                        "Y por eso muchas veces pasamos por alto\n" +
                        "lo que realmente es:"
                },
                { type: "quote", text: "Un punto de inflexión" },
                { type: "p", text: "No ruidoso.\nNo dramático.\nSino silencioso y honesto." },

                { type: "h2", text: "Por qué tememos el punto más bajo" },
                { type: "p", text: "Aprendimos a ser fuertes.\nA aguantar.\nA seguir." },
                {
                    type: "p",
                    text:
                        "Un punto bajo contradice todo\n" +
                        "lo que aprendimos sobre control, éxito\n" +
                        "y autooptimización.\n\n" +
                        "Nos confronta con preguntas como:"
                },
                {
                    type: "ul",
                    items: [
                        "¿Por qué ya no funciona?",
                        "¿Por qué mi fuerza no alcanza?",
                        "¿Por qué me siento tan vacío si “en teoría todo está bien”?"
                    ]
                },
                {
                    type: "p",
                    text:
                        "El dolor no está solo\n" +
                        "en la experiencia en sí,\n" +
                        "sino en que\n" +
                        "no encaja con la imagen que tenemos de nosotros."
                },

                { type: "h2", text: "El dolor no es señal de debilidad, sino de verdad" },
                {
                    type: "p",
                    text:
                        "Desde lo psicológico, el dolor no es un enemigo.\n" +
                        "Es una señal.\n\n" +
                        "Un indicio de que algo fue ignorado,\n" +
                        "reprimido o pasado por alto durante demasiado tiempo:"
                },
                {
                    type: "ul",
                    items: [
                        "límites propios",
                        "emociones no procesadas",
                        "necesidades no satisfechas",
                        "conflictos internos"
                    ]
                },
                {
                    type: "p",
                    text:
                        "Muchas personas funcionan durante años\n" +
                        "en contra de sí mismas hasta que el sistema ya no puede más."
                },
                {
                    type: "quote",
                    text:
                        "Un punto bajo no es un colapso.\n" +
                        "Es el momento en que la verdad se vuelve más fuerte\n" +
                        "que el empujarlo todo hacia un lado."
                },

                { type: "h2", text: "Por qué el cambio casi siempre empieza con dolor" },
                { type: "p", text: "El cambio real rara vez nace de la comodidad." },
                { type: "p", text: "Nace donde ya no es posible seguir negando." },
                {
                    type: "p",
                    text:
                        "El punto bajo nos quita algo:\n\n" +
                        "la ilusión de control,\n" +
                        "roles antiguos,\n" +
                        "estrategias de supervivencia.\n\n" +
                        "Y así se crea espacio.\n" +
                        "No de inmediato para soluciones,\n" +
                        "pero sí para la honestidad.\n\n" +
                        "Y la honestidad es el primer paso real\n" +
                        "hacia la sanación."
                },

                {
                    type: "image",
                    src: "/img/blog/bandt01.webp",
                    alt: "Hojas verdes",
                    caption: "IMAGEN 2: Hoja (bajar contraste)."
                },

                { type: "h2", text: "El punto de inflexión no es éxito externo, sino una decisión interna" },
                {
                    type: "p",
                    text:
                        "Muchas personas buscan el punto de inflexión en el gran acontecimiento.\n\n" +
                        "Pero psicológicamente suele ocurrir de forma discreta y silenciosa.\n\n" +
                        "Empieza con una frase interna:"
                },
                { type: "quote", text: "“Así como está,\nno puede seguir.”" },
                { type: "p", text: "O:" },
                { type: "quote", text: "“No quiero\nperderme a mí mismo\npor más tiempo.”" },
                {
                    type: "p",
                    text:
                        "En ese momento,\n" +
                        "algo fundamental se desplaza:\n\n" +
                        "Dejas de ponerte en contra de lo que sientes\n" +
                        "y empiezas a tomarte en serio.\n\n" +
                        "Eso es autoempoderamiento.\n" +
                        "No ruidoso — pero profundo."
                },

                { type: "h2", text: "Sanar no significa que el dolor desaparezca de inmediato" },
                { type: "p", text: "Un error común:" },
                { type: "p", text: "Sanar no significa\nque nunca volverá a doler." },
                { type: "p", text: "Sanar significa:" },
                {
                    type: "ul",
                    items: [
                        "escuchas en lugar de pasarte por encima",
                        "te quedas presente en lugar de huir",
                        "te encuentras contigo con responsabilidad y compasión"
                    ]
                },
                {
                    type: "p",
                    text:
                        "El dolor pierde su poder\n" +
                        "cuando ya no tiene que ser combatido.\n\n" +
                        "Entonces se convierte en un guía."
                },

                { type: "h2", text: "Si ahora mismo estás en tu punto más bajo" },
                { type: "p", text: "No has fracasado.\nNo eres demasiado débil.\nY no estás “mal”." },
                {
                    type: "p",
                    text:
                        "Tal vez estás exactamente donde\n\n" +
                        "tu vida quiere volverse más honesta.\n\n" +
                        "El punto más bajo suele ser el momento\n" +
                        "en el que dejas de traicionarte\n" +
                        "y se abre espacio para lo nuevo.\n\n" +
                        "Y eso es precisamente\n" +
                        "lo que lo convierte en un punto de inflexión."
                },

                { type: "h2", text: "Auto-reflexión" },
                { type: "p", text: "3 preguntas con efecto" },
                {
                    type: "p",
                    text:
                        "Si este texto te toca,\n" +
                        "tómate un momento\n" +
                        "para estas preguntas:"
                },
                {
                    type: "ul",
                    items: [
                        "¿Qué en mi vida ya no se siente alineado?",
                        "¿Dónde me aferro a algo que me cuesta energía?",
                        "¿Qué sería posible si me tomo más en serio que a mi miedo?"
                    ]
                },

                { type: "h2", text: "El dolor no es el final, es la transición" },
                {
                    type: "p",
                    text:
                        "Un punto bajo no es una prueba\n" +
                        "de que fracasaste.\n\n" +
                        "A menudo es el punto\n" +
                        "en el que empiezas\n" +
                        "a recuperarte.\n\n" +
                        "No todo lo que se rompe está mal.\n" +
                        "Algunas cosas se rompen para que nazca algo nuevo.\n\n" +
                        "Y a veces, eso que ahora se siente como\n" +
                        "el momento más duro,\n" +
                        "es el comienzo de tu nuevo camino."
                },
                {
                    type: "p",
                    text:
                        "Si después de este texto\n" +
                        "no te sientes más claro, sino más quieto,\n" +
                        "eso no es un retroceso.\n\n" +
                        "De eso trata el próximo post:\n\n" +
                        "El punto de inflexión comienza en silencio.\n"
                }
            ]
        },
        tags: {
            de: ["Bewusstsein", "Krise", "Wendepunkt", "Heilung"],
            en: ["awareness", "crisis", "turning point", "healing"],
            es: ["conciencia", "crisis", "punto de inflexión", "sanación"]
        }
    }



]);

/**
 * Minimal helpers (used by /blog and /blog/[slug])
 */
export function getAllPosts() {
    return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(category) {
    return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug) {
    return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentPosts(slug, { category } = {}) {
  const all = getAllPosts();
  const list = category ? all.filter((p) => p.category === category) : all;

  const idx = list.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  // getAllPosts() devuelve newest -> oldest
  // "prev" = post más nuevo (arriba en la lista)
  // "next" = post más viejo (abajo en la lista)
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx < list.length - 1 ? list[idx + 1] : null;

  return { prev, next };
}