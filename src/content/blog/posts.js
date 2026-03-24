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
            es: "Sobre las crisis internas, la conciencia y el cambio real - y por qué el punto de inflexión suele empezar en silencio."
        },
        readingTime: { de: "7 min", en: "7 min", es: "7 min" },
        cover: "/img/blog/PLACEHOLDER-COVER.webp",
        content: {
            de: [

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

                { type: "h2", text: "Der Wendepunkt ist nicht äusserer Erfolg, sondern eine innere Entscheidung" },
                {
                    type: "p",
                    text:
                        "Viele schauen beim Wendepunkt auf das grosse Ereignis.\n\n" +
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

                { type: "h2", text: "Selbstreflexion" },
                { type: "p", text: "3 Fragen mit Wirkung" },
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

                { type: "h2", text: "Pain is not a sign of weakness - it’s a sign of truth" },
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

                { type: "h2", text: "The turning point is not outer success - it’s an inner decision" },
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
                        "Not loud - but profound."
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

                { type: "h2", text: "Pain is not the end - it’s the transition" },
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

                {
                    type: "image",
                    src: "/img/blog/bandt02.webp",
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
                        "No ruidoso - pero profundo."
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
    },
    {
        slug: "der-wendepunkt-beginnt-leise",
        category: "transformation",
        date: "2026-01-11",
        title: {
            de: "Der Wendepunkt beginnt leise",
            en: "The turning point begins quietly",
            es: "El punto de inflexión empieza en silencio"
        },
        excerpt: {
            de: "Was sich nach dem Tiefpunkt wirklich verändert – und warum diese stille Phase keine Sackgasse ist, sondern Übergang.",
            en: "What truly changes after your lowest point – and why the quiet phase isn’t a dead end, but a transition.",
            es: "Lo que realmente cambia después de tocar fondo – y por qué esta fase silenciosa no es un callejón sin salida, sino una transición."
        },
        readingTime: { de: "5 min", en: "5 min", es: "5 min" },
        cover: "/img/blog/02/01.webp",
        content: {
            de: [
                {
                    type: "image",
                    src: "/img/blog/02/01.webp",
                    alt: "Stille und Übergang",
                    caption: ""
                },

                {
                    type: "p",
                    text:
                        "Was sich nach dem Tiefpunkt wirklich verändert.\n\n" +
                        "Dieser Text ist für die Zeit danach –\n" +
                        "für eine Phase, in der es noch keine Antworten und Entscheidungen gibt.\n\n" +
                        "Für diesen seltsamen Moment,\n" +
                        "in dem etwas zu Ende gegangen ist\n" +
                        "und noch nichts Neues da ist."
                },

                { type: "h2", text: "Nach dem Tiefpunkt kommt selten Klarheit" },
                {
                    type: "p",
                    text:
                        "Viele erwarten, dass nach einem Tiefpunkt eine Klarheit entsteht\n" +
                        "und man plötzlich weiss, wie es weitergehen soll.\n\n" +
                        "Man hat die Hoffnung, dass Entscheidungen leichter werden\n" +
                        "oder dass zumindest eine Richtung spürbar ist."
                },
                {
                    type: "p",
                    text:
                        "Doch meistens passiert das nicht.\n" +
                        "Stattdessen entsteht ein Raum ohne Erklärung, ohne Plan –\n" +
                        "und es ist ruhig.\n\n" +
                        "Das ist kein Rückschritt,\n" +
                        "sondern eine Übergangsphase."
                },

                { type: "h2", text: "Warum der Tiefpunkt oft der Anfang ist" },
                {
                    type: "p",
                    text:
                        "Ein Tiefpunkt kann Erleichterung bringen,\n" +
                        "weil endlich klar ist, dass es so nicht weitergehen kann.\n\n" +
                        "Erst durch einen Tiefpunkt lernen wir,\n" +
                        "dass etwas zu Ende gekommen ist,\n" +
                        "was lange nicht mehr getragen werden konnte."
                },
                {
                    type: "p",
                    text:
                        "Wir kennen sie alle: die Komfortzone –\n" +
                        "diese gemütliche Zone, in der Veränderung kaum möglich ist.\n\n" +
                        "Doch viele fürchten sich davor, aus der Komfortzone zu gehen,\n" +
                        "weil Veränderung meistens unbequem ist.\n\n" +
                        "Den Tiefpunkt sehen viele als Fall an –\n" +
                        "und nur wenige sehen den Raum,\n" +
                        "den es für neue Möglichkeiten gibt."
                },

                {
                    type: "image",
                    src: "/img/blog/02/02.webp",
                    alt: "Neuausrichtung und Stille",
                    caption: ""
                },

                { type: "h2", text: "Warum Veränderung mit Anhalten beginnt" },
                {
                    type: "p",
                    text:
                        "Veränderung wird oft mit Mut, Aktion und klaren Schritten nach vorn gleichgesetzt.\n" +
                        "Doch innerlich beginnt Veränderung häufig anders:\n" +
                        "mit Stille, Aushalten."
                },
                {
                    type: "p",
                    text:
                        "Ein Wendepunkt – dieses innerliche, leise Flüstern –\n" +
                        "fragt nicht: «Was mache ich jetzt?»,\n" +
                        "sondern: «Was will ich so nicht mehr weiterführen?»\n\n" +
                        "Und genau da beginnt Veränderung:\n" +
                        "wenn diese Stimme so laut wird,\n" +
                        "dass sie uns trägt in den ersten Schritten des Wendepunkts."
                },

                { type: "h2", text: "Warum sich diese Zeit einsam anfühlen kann" },
                {
                    type: "p",
                    text:
                        "Viele erleben diese Phase als einsam –\n" +
                        "nicht, weil niemand da ist.\n\n" +
                        "Sondern weil das Alte nicht mehr trägt\n" +
                        "und das Neue noch leise ist und keine Form hat.\n\n" +
                        "Doch es wird klar, dass Zurückgehen keine Option ist.\n" +
                        "Jedoch fühlt sich der erste Schritt nach vorne\n" +
                        "noch nicht richtig an."
                },
                {
                    type: "p",
                    text:
                        "Dies fühlt sich häufig wie ein Stillstand an,\n" +
                        "es ist aber Orientierung auf einer tieferen Ebene.\n\n" +
                        "Diese Phase des Sich-verloren-Fühlens\n" +
                        "gibt Raum für Neuordnung und einen Neuanfang."
                },

                { type: "h2", text: "Wenn du gerade mittendrin steckst" },
                {
                    type: "p",
                    text:
                        "Vielleicht befindest du dich genau dort,\n" +
                        "wo sich Körper, Nervensystem und dein Inneres neu ausrichten.\n\n" +
                        "Vor der Neuordnung bzw. dem Neuanfang\n" +
                        "kommt oft der Zusammenbruch, der Tiefpunkt.\n\n" +
                        "Man beginnt zu erkennen, wo man sich lange angepasst hat.\n" +
                        "Es scheint wie eine dunkle Wolke der Erkenntnis.\n\n" +
                        "Diese Phase ist nicht einfach,\n" +
                        "aber ehrlicher – und dies verändert viel."
                },

                { type: "h2", text: "Drei Fragen für dich" },
                {
                    type: "p",
                    text:
                        "Nimm sie nicht als Aufgabe,\n" +
                        "sondern als Einladung."
                },
                {
                    type: "ul",
                    items: [
                        "Wo versuche ich gerade, etwas zu beschleunigen?",
                        "Was in mir braucht Raum, nicht Antwort?",
                        "Was wäre, wenn ich dieser Unsicherheit nicht ausweiche?"
                    ]
                },

                { type: "h2", text: "Der Wendepunkt ist der Übergang, nicht die Lösung" },
                {
                    type: "p",
                    text:
                        "Nicht alles, was sich leer anfühlt, ist Verlust.\n" +
                        "Manches ist Vorbereitung.\n\n" +
                        "Der Wendepunkt ist der Moment,\n" +
                        "in dem du aufhörst, dich neu zu erfinden,\n" +
                        "und beginnst, dir selbst wieder zuzuhören.\n\n" +
                        "Und genau dort setzt der nächste Text an."
                }
            ],

            en: [
                {
                    type: "image",
                    src: "/img/blog/02/01.webp",
                    alt: "Quiet transition",
                    caption: ""
                },

                {
                    type: "p",
                    text:
                        "What truly changes after your lowest point.\n\n" +
                        "This text is for the time after –\n" +
                        "for a phase where there are no clear answers or decisions yet.\n\n" +
                        "For that strange moment\n" +
                        "when something has ended\n" +
                        "and nothing new has arrived."
                },

                { type: "h2", text: "After the lowest point, clarity rarely comes" },
                {
                    type: "p",
                    text:
                        "Many expect that after a breakdown, clarity will appear\n" +
                        "and that suddenly you’ll know what’s next.\n\n" +
                        "You hope decisions will become easier,\n" +
                        "or at least that a direction will be felt."
                },
                {
                    type: "p",
                    text:
                        "But most of the time, that doesn’t happen.\n" +
                        "Instead, a space opens up: no explanation, no plan –\n" +
                        "and it becomes quiet.\n\n" +
                        "That’s not a setback.\n" +
                        "It’s a transition."
                },

                { type: "h2", text: "Why the lowest point is often the beginning" },
                {
                    type: "p",
                    text:
                        "A lowest point can bring relief,\n" +
                        "because it finally becomes clear that things can’t continue like this.\n\n" +
                        "Only through that breaking point do we learn\n" +
                        "that something has ended\n" +
                        "that stopped holding us a long time ago."
                },
                {
                    type: "p",
                    text:
                        "We all know it: the comfort zone –\n" +
                        "that cozy place where change is hardly possible.\n\n" +
                        "Many fear leaving it,\n" +
                        "because change is usually uncomfortable.\n\n" +
                        "Most people see the lowest point as a fall –\n" +
                        "and only a few see the space\n" +
                        "that opens for new possibilities."
                },

                {
                    type: "image",
                    src: "/img/blog/02/02.webp",
                    alt: "Stillness and reorientation",
                    caption: ""
                },

                { type: "h2", text: "Why change begins with stopping" },
                {
                    type: "p",
                    text:
                        "Change is often associated with courage, action, and clear steps forward.\n" +
                        "But internally, change often begins differently:\n" +
                        "with stillness, with staying."
                },
                {
                    type: "p",
                    text:
                        "A turning point – that quiet inner whisper –\n" +
                        "doesn’t ask: “What do I do now?”\n" +
                        "but: “What am I no longer willing to carry?”\n\n" +
                        "That’s where change begins:\n" +
                        "when that voice becomes strong enough\n" +
                        "to carry you into the first steps."
                },

                { type: "h2", text: "Why this time can feel lonely" },
                {
                    type: "p",
                    text:
                        "Many experience this phase as lonely –\n" +
                        "not because no one is there.\n\n" +
                        "But because the old no longer holds,\n" +
                        "and the new is still quiet and without shape.\n\n" +
                        "It becomes clear that going back isn’t an option.\n" +
                        "Yet the first step forward doesn’t feel right-yet."
                },
                {
                    type: "p",
                    text:
                        "It often feels like standing still,\n" +
                        "but it’s orientation on a deeper level.\n\n" +
                        "This feeling of being lost\n" +
                        "creates space for reordering and a new beginning."
                },

                { type: "h2", text: "If you’re right in the middle of it" },
                {
                    type: "p",
                    text:
                        "Maybe you’re exactly there:\n" +
                        "where your body, nervous system, and inner world are realigning.\n\n" +
                        "Before reordering-or a new beginning-\n" +
                        "there is often collapse, the lowest point.\n\n" +
                        "You start seeing where you adapted for too long.\n" +
                        "It can feel like a dark cloud of realization.\n\n" +
                        "This phase isn’t easy,\n" +
                        "but it’s more honest-and it changes a lot."
                },

                { type: "h2", text: "Three questions for you" },
                {
                    type: "p",
                    text:
                        "Don’t take them as a task,\n" +
                        "but as an invitation."
                },
                {
                    type: "ul",
                    items: [
                        "Where am I trying to speed something up right now?",
                        "What in me needs space-not an answer?",
                        "What if I didn’t avoid this uncertainty?"
                    ]
                },

                { type: "h2", text: "The turning point is the transition-not the solution" },
                {
                    type: "p",
                    text:
                        "Not everything that feels empty is loss.\n" +
                        "Some of it is preparation.\n\n" +
                        "The turning point is the moment\n" +
                        "you stop reinventing yourself,\n" +
                        "and begin listening to yourself again.\n\n" +
                        "And that’s exactly where the next text begins."
                }
            ],

            es: [
                {
                    type: "image",
                    src: "/img/blog/02/01.webp",
                    alt: "Transición en silencio",
                    caption: ""
                },

                {
                    type: "p",
                    text:
                        "Lo que realmente cambia después de tocar fondo.\n\n" +
                        "Este texto es para el después:\n" +
                        "para una fase en la que todavía no hay respuestas ni decisiones claras.\n\n" +
                        "Para ese momento extraño\n" +
                        "en el que algo terminó\n" +
                        "y todavía no llegó nada nuevo."
                },

                { type: "h2", text: "Después de tocar fondo, rara vez llega la claridad" },
                {
                    type: "p",
                    text:
                        "Muchas personas esperan que, después de un punto bajo,\n" +
                        "aparezca claridad y de repente sepan cómo seguir.\n\n" +
                        "Tienen la esperanza de que decidir sea más fácil,\n" +
                        "o al menos que se sienta una dirección."
                },
                {
                    type: "p",
                    text:
                        "Pero la mayoría de las veces no sucede.\n" +
                        "En lugar de eso, se abre un espacio: sin explicación, sin plan,\n" +
                        "y se vuelve silencioso.\n\n" +
                        "No es un retroceso.\n" +
                        "Es una transición."
                },

                { type: "h2", text: "Por qué tocar fondo suele ser el comienzo" },
                {
                    type: "p",
                    text:
                        "Tocar fondo puede traer alivio,\n" +
                        "porque por fin queda claro que así no se puede seguir.\n\n" +
                        "Recién en ese punto aprendemos\n" +
                        "que algo terminó:\n" +
                        "algo que hace tiempo ya no nos sostenía."
                },
                {
                    type: "p",
                    text:
                        "Todos conocemos la zona de confort:\n" +
                        "ese lugar cómodo donde el cambio casi no es posible.\n\n" +
                        "Muchas personas temen salir de ahí,\n" +
                        "porque cambiar suele ser incómodo.\n\n" +
                        "La mayoría ve el punto bajo como una caída;\n" +
                        "y pocas ven el espacio\n" +
                        "que se abre para nuevas posibilidades."
                },

                {
                    type: "image",
                    src: "/img/blog/02/02.webp",
                    alt: "Reorientación y calma",
                    caption: ""
                },

                { type: "h2", text: "Por qué el cambio empieza al detenerse" },
                {
                    type: "p",
                    text:
                        "Muchas veces asociamos el cambio con valentía, acción y pasos claros hacia adelante.\n" +
                        "Pero por dentro, el cambio suele empezar distinto:\n" +
                        "con silencio, con sostener."
                },
                {
                    type: "p",
                    text:
                        "Un punto de inflexión -ese susurro interno-\n" +
                        "no pregunta: «¿Qué hago ahora?»,\n" +
                        "sino: «¿Qué no quiero seguir sosteniendo así?»\n\n" +
                        "Ahí empieza el cambio:\n" +
                        "cuando esa voz se vuelve lo suficientemente fuerte\n" +
                        "como para llevarte a los primeros pasos."
                },

                { type: "h2", text: "Por qué este tiempo puede sentirse solitario" },
                {
                    type: "p",
                    text:
                        "Muchas personas viven esta fase como soledad,\n" +
                        "no porque no haya nadie.\n\n" +
                        "Sino porque lo viejo ya no sostiene,\n" +
                        "y lo nuevo todavía es silencioso y no tiene forma.\n\n" +
                        "Se vuelve claro que volver atrás no es una opción.\n" +
                        "Pero el primer paso hacia adelante todavía no se siente bien."
                },
                {
                    type: "p",
                    text:
                        "A menudo se siente como un estancamiento,\n" +
                        "pero es orientación en un nivel más profundo.\n\n" +
                        "Esta fase de sentirse perdido\n" +
                        "da espacio para reordenar y empezar de nuevo."
                },

                { type: "h2", text: "Si estás justo en el medio" },
                {
                    type: "p",
                    text:
                        "Quizás estás exactamente ahí:\n" +
                        "donde tu cuerpo, tu sistema nervioso y tu interior se están reacomodando.\n\n" +
                        "Antes del reordenamiento -o de un nuevo comienzo-\n" +
                        "muchas veces aparece el colapso, el punto bajo.\n\n" +
                        "Empezás a ver dónde te adaptaste demasiado tiempo.\n" +
                        "Puede sentirse como una nube oscura de conciencia.\n\n" +
                        "No es una fase fácil,\n" +
                        "pero es más honesta -y cambia mucho."
                },

                { type: "h2", text: "Tres preguntas para vos" },
                {
                    type: "p",
                    text:
                        "No las tomes como una tarea,\n" +
                        "sino como una invitación."
                },
                {
                    type: "ul",
                    items: [
                        "¿Dónde estoy intentando acelerar algo ahora mismo?",
                        "¿Qué dentro de mí necesita espacio, no una respuesta?",
                        "¿Qué pasaría si no evitara esta incertidumbre?"
                    ]
                },

                { type: "h2", text: "El punto de inflexión es la transición, no la solución" },
                {
                    type: "p",
                    text:
                        "No todo lo que se siente vacío es pérdida.\n" +
                        "A veces es preparación.\n\n" +
                        "El punto de inflexión es el momento\n" +
                        "en el que dejás de reinventarte\n" +
                        "y empezás a escucharte de nuevo.\n\n" +
                        "Y exactamente ahí empieza el próximo texto."
                }
            ]
        }
    },
    {
        slug: "was-ich-uber-mich-gelernt-habe-als-alles-still-wurde",
        category: "story",
        date: "2026-01-18",
        title: {
            de: "Was ich über mich gelernt habe, als alles still wurde",
            en: "What I learned about myself when everything became still",
            es: "Lo que aprendí sobre mí cuando todo se volvió silencio"
        },
        excerpt: {
            de: "Zeit im Dschungel, Zusammenbruch und der Verlust meiner Identität – warum Stille nicht romantisch ist, sondern ehrlich. Und wie genau dort Rückverbindung entsteht.",
            en: "Time in the jungle, collapse, and the quiet loss of identity—why stillness isn’t romantic, but honest. And how reconnection begins right there.",
            es: "Tiempo en la jungla, colapso y la pérdida silenciosa de la identidad: por qué el silencio no es romántico, sino honesto. Y cómo ahí empieza la reconexión."
        },
        readingTime: { de: "7 min", en: "7 min", es: "7 min" },
        cover: "/img/blog/03/jungle-bridge.webp",
        content: {
            de: [
                {
                    type: "image",
                    src: "/img/blog/03/jungle-bridge.webp",
                    alt: "Brücke im Dschungel",
                    caption: ""
                },

                { type: "p", text: "Zeit im Dschungel, Zusammenbruch und der Verlust meiner Identität" },

                {
                    type: "p",
                    text:
                        "Jahrelang funktionierte ich.\n" +
                        "Ich war überall, nur nicht bei mir selbst.\n\n" +
                        "Ich definierte mich über meine Rolle als Sozialarbeiterin.\n" +
                        "Die Person, die immer Zeit hat, für Andere präsent ist.\n\n" +
                        "Zeit für mich kannte ich nicht.\n" +
                        "Und wenn ich sie hatte, fühlte sie sich falsch an.\n\n" +
                        "Alleinsein und Stille waren für mich nichts Beruhigendes,\n" +
                        "sondern etwas Bedrohliches.\n\n" +
                        "Dann kam eine Zeit, in der alles still wurde.\n" +
                        "Und ich hatte keine Kontrolle darüber.\n\n" +
                        "In der Pandemie verlor ich meinen Job als Sozialarbeiterin.\n" +
                        "Ich zog in den Dschungel.\n" +
                        "Fernab vom Lärm der Hauptstadt.\n" +
                        "Ohne Internet. Ohne Müssen. Ohne Funktionieren.\n\n" +
                        "Was sich zuerst wie Freiheit anfühlte,\n" +
                        "war in Wahrheit mein persönlicher Zusammenbruch."
                },

                { type: "h2", text: "Wenn Stille nichts Romantisches hat" },
                {
                    type: "p",
                    text:
                        "Stille wird oft romantisiert.\n" +
                        "Als Ort der Klarheit. Als spirituelle Erfahrung.\n\n" +
                        "Doch echte Stille ist nicht sanft.\n" +
                        "Sie ist ehrlich.\n\n" +
                        "Ohne Ablenkung werden Gedanken sichtbar,\n" +
                        "die lange überhört wurden:"
                },
                {
                    type: "ul",
                    items: ["Angst", "Leere", "Schmerz", "Erschöpfung"]
                },

                { type: "h2", text: "Eine Beziehung, die mich von mir entfernte" },
                {
                    type: "p",
                    text:
                        "Es gab eine Beziehung in meinem Leben,\n" +
                        "die mich etwas Wesentliches kostete:\n" +
                        "meine Identität.\n\n" +
                        "Ich wurde leiser. Angepasster. Unsicherer.\n" +
                        "Ich begann, mich selbst infrage zu stellen,\n" +
                        "weil ich den Kontakt zu mir verlor.\n\n" +
                        "Bevor ich in den Dschungel zog,\n" +
                        "glaubte ich, diese Beziehung hinter mir gelassen zu haben.\n" +
                        "Ich dachte, Zeit würde alles heilen.\n\n" +
                        "Doch das Trauma kam mit.\n\n" +
                        "Erst in der Stille, ohne Ablenkung,\n" +
                        "holte mich die Vergangenheit vollständig ein."
                },

                { type: "h2", text: "Wie Identität leise verschwindet" },
                {
                    type: "p",
                    text:
                        "Identität geht selten plötzlich verloren.\n" +
                        "Sie verblasst.\n\n" +
                        "Wenn du aufhörst, deinem inneren Nein zu vertrauen.\n" +
                        "Wenn du dich anpasst, um zu bleiben.\n" +
                        "Wenn du irgendwann nicht mehr weisst,\n" +
                        "was du eigentlich möchtest.\n\n" +
                        "Der Zusammenbruch kam nicht plötzlich.\n" +
                        "Ich hatte mich nur zu lange nicht gehört."
                },

                {
                    type: "image",
                    src: "/img/blog/03/jungle-tree.webp",
                    alt: "Baum im Dschungel",
                    caption: ""
                },

                { type: "h2", text: "Der Dschungel als Spiegel" },
                {
                    type: "p",
                    text:
                        "Allein im Dschungel gab es nichts,\n" +
                        "woran ich mich festhalten konnte.\n\n" +
                        "Keine Rollen.\n" +
                        "Keine Erwartungen.\n" +
                        "Keine Beziehungen, die mich definierten.\n\n" +
                        "Nur Stille.\n" +
                        "Zu viel Zeit.\n" +
                        "Und all die Stimmen in meinem Kopf.\n\n" +
                        "Dieses Chaos fühlte sich zuerst wie ein Absturz an.\n" +
                        "Ich sah die Welt nur noch in Schwarz und Weiss.\n" +
                        "Fühlte mich als Opfer meiner Vergangenheit.\n" +
                        "Verlor oft den Blick für einen Ausweg.\n\n" +
                        "Was frei begann, wurde mein inneres Gefängnis.\n\n" +
                        "Und genau dort begann etwas Entscheidendes:\n" +
                        "Ich hörte mir zum ersten Mal ehrlich zu.\n" +
                        "Ohne Ablenkung.\n" +
                        "Ohne Verdrängung."
                },

                { type: "h2", text: "Was ich gelernt habe, als alles still wurde" },
                {
                    type: "p",
                    text:
                        "Ich war nicht verloren.\n" +
                        "Ich war beschäftigt damit, mich abzulenken.\n\n" +
                        "Ich lernte, dass man vor der eigenen Vergangenheit\n" +
                        "nicht davonlaufen kann,\n" +
                        "sonst kontrolliert sie dich.\n\n" +
                        "Ich lernte, dass Licht ohne Schatten nicht existiert.\n" +
                        "Und dass Heilung nicht im Verdrängen liegt,\n" +
                        "sondern im Anerkennen."
                },

                { type: "h2", text: "Zurück zu mir war kein romantischer Weg" },
                {
                    type: "p",
                    text:
                        "Mein Weg begann nicht mit einer Erleuchtung.\n" +
                        "Sondern mit kleinen Entscheidungen:"
                },
                {
                    type: "ul",
                    items: ["innehalten", "nicht mehr erklären", "mich ernst nehmen", "bleiben, wenn es unbequem wird"]
                },
                {
                    type: "p",
                    text:
                        "Rückverbindung ist kein gerader Weg.\n" +
                        "Sie entsteht im Dazwischen."
                },

                { type: "h2", text: "Warum ich diese Geschichte teile" },
                {
                    type: "p",
                    text:
                        "Weil viele glauben,\n" +
                        "sie müssten lauter, stärker oder besser werden.\n\n" +
                        "Dabei geht es oft darum,\n" +
                        "aufzuhören, sich selbst zu verlieren.\n\n" +
                        "Stille ist kein Rückzug.\n" +
                        "Sie ist ein Spiegel.\n\n" +
                        "Und genau dort,\n" +
                        "wenn nichts mehr trägt ausser du selbst,\n" +
                        "beginnt oft der Neubeginn."
                },

                {
                    type: "p",
                    text:
                        "Als alles still wurde,\n" +
                        "bin ich mir selbst begegnet.\n\n" +
                        "Nicht als geheilte Version.\n" +
                        "Sondern als echte.\n\n" +
                        "Und genau das war der Anfang.\n" +
                        "Mein Neubeginn."
                },

                { type: "hr" },

                {
                    type: "p",
                    text:
                        "Die Stille im Dschungel hat mir vieles gezeigt.\n" +
                        "Doch sie hat mir nichts „abgenommen“.\n\n" +
                        "Was danach kam, war keine Antwort.\n" +
                        "Sondern Zeit.\n\n" +
                        "Zeit, in der sich das Erlebte setzen durfte.\n" +
                        "Zeit, in der nichts beschleunigt werden konnte.\n\n" +
                        "Genau dort begann ein anderes Verstehen.\n\n" +
                        "Warum Bewusstsein Zeit braucht."
                }
            ],

            en: [
                {
                    type: "image",
                    src: "/img/blog/03/jungle-bridge.webp",
                    alt: "Bridge in the jungle",
                    caption: ""
                },

                { type: "p", text: "Time in the jungle, collapse, and the quiet loss of identity" },

                {
                    type: "p",
                    text:
                        "For years, I functioned.\n" +
                        "I was everywhere—just not with myself.\n\n" +
                        "I defined myself through my role as a social worker.\n" +
                        "The one who always has time, always shows up for others.\n\n" +
                        "Time for me didn’t exist.\n" +
                        "And when it did, it felt wrong.\n\n" +
                        "Being alone and being in stillness wasn’t soothing.\n" +
                        "It felt threatening.\n\n" +
                        "Then a time came when everything became quiet.\n" +
                        "And I had no control over it.\n\n" +
                        "During the pandemic, I lost my job as a social worker.\n" +
                        "I moved into the jungle.\n" +
                        "Far away from the noise of the city.\n" +
                        "No internet. No pressure. No functioning.\n\n" +
                        "What first felt like freedom\n" +
                        "was, in truth, my personal collapse."
                },

                { type: "h2", text: "When stillness isn’t romantic" },
                {
                    type: "p",
                    text:
                        "Stillness is often romanticized—\n" +
                        "as a place of clarity, as a spiritual experience.\n\n" +
                        "But real stillness isn’t gentle.\n" +
                        "It’s honest.\n\n" +
                        "Without distraction, thoughts become visible\n" +
                        "that were ignored for a long time:"
                },
                { type: "ul", items: ["Fear", "Emptiness", "Pain", "Exhaustion"] },

                { type: "h2", text: "A relationship that pulled me away from myself" },
                {
                    type: "p",
                    text:
                        "There was a relationship in my life\n" +
                        "that cost me something essential:\n" +
                        "my identity.\n\n" +
                        "I became quieter. More adapted. More insecure.\n" +
                        "I started questioning myself\n" +
                        "because I lost contact with who I was.\n\n" +
                        "Before I moved into the jungle,\n" +
                        "I believed I had left that relationship behind.\n" +
                        "I thought time would heal everything.\n\n" +
                        "But the trauma came with me.\n\n" +
                        "Only in stillness—without distraction—\n" +
                        "the past caught up with me completely."
                },

                { type: "h2", text: "How identity disappears quietly" },
                {
                    type: "p",
                    text:
                        "Identity rarely disappears all at once.\n" +
                        "It fades.\n\n" +
                        "When you stop trusting your inner “no.”\n" +
                        "When you adapt in order to stay.\n" +
                        "When one day you no longer know\n" +
                        "what you actually want.\n\n" +
                        "The collapse didn’t come suddenly.\n" +
                        "I had simply ignored myself for too long."
                },

                {
                    type: "image",
                    src: "/img/blog/03/jungle-tree.webp",
                    alt: "Tree in the jungle",
                    caption: ""
                },

                { type: "h2", text: "The jungle as a mirror" },
                {
                    type: "p",
                    text:
                        "Alone in the jungle, there was nothing\n" +
                        "I could hold on to.\n\n" +
                        "No roles.\n" +
                        "No expectations.\n" +
                        "No relationships that defined me.\n\n" +
                        "Just stillness.\n" +
                        "Too much time.\n" +
                        "And every voice in my head.\n\n" +
                        "At first, the chaos felt like a crash.\n" +
                        "I saw the world in black and white.\n" +
                        "I felt like a victim of my past.\n" +
                        "I often lost sight of a way out.\n\n" +
                        "What began as freedom became my inner prison.\n\n" +
                        "And right there, something decisive began:\n" +
                        "For the first time, I listened to myself honestly.\n" +
                        "No distraction.\n" +
                        "No avoiding."
                },

                { type: "h2", text: "What I learned when everything became still" },
                {
                    type: "p",
                    text:
                        "I wasn’t lost.\n" +
                        "I was busy distracting myself.\n\n" +
                        "I learned you can’t outrun your past—\n" +
                        "otherwise it will control you.\n\n" +
                        "I learned that light doesn’t exist without shadow.\n" +
                        "And that healing isn’t found in pushing things away,\n" +
                        "but in acknowledging them."
                },

                { type: "h2", text: "Coming back to myself wasn’t romantic" },
                {
                    type: "p",
                    text:
                        "My path didn’t begin with an awakening.\n" +
                        "It began with small decisions:"
                },
                { type: "ul", items: ["to pause", "to stop explaining", "to take myself seriously", "to stay when it gets uncomfortable"] },
                {
                    type: "p",
                    text:
                        "Reconnection isn’t a straight line.\n" +
                        "It happens in the in-between."
                },

                { type: "h2", text: "Why I’m sharing this story" },
                {
                    type: "p",
                    text:
                        "Because many people believe\n" +
                        "they have to become louder, stronger, or better.\n\n" +
                        "But often it’s about this:\n" +
                        "stopping the slow loss of yourself.\n\n" +
                        "Stillness isn’t retreat.\n" +
                        "It’s a mirror.\n\n" +
                        "And right there—\n" +
                        "when nothing holds you except yourself—\n" +
                        "a new beginning often starts."
                },

                {
                    type: "p",
                    text:
                        "When everything became still,\n" +
                        "I met myself.\n\n" +
                        "Not as a healed version.\n" +
                        "But as a real one.\n\n" +
                        "And that was the beginning.\n" +
                        "My new beginning."
                },

                { type: "hr" },

                {
                    type: "p",
                    text:
                        "The stillness in the jungle showed me a lot.\n" +
                        "But it didn’t “take anything away” for me.\n\n" +
                        "What came after wasn’t an answer.\n" +
                        "It was time.\n\n" +
                        "Time for what I lived through to settle.\n" +
                        "Time where nothing could be rushed.\n\n" +
                        "That’s where a different understanding began:\n\n" +
                        "Why consciousness needs time."
                }
            ],

            es: [
                {
                    type: "image",
                    src: "/img/blog/03/jungle-bridge.webp",
                    alt: "Puente en la jungla",
                    caption: ""
                },

                { type: "p", text: "Tiempo en la jungla, colapso y la pérdida de mi identidad" },

                {
                    type: "p",
                    text:
                        "Durante años, funcioné.\n" +
                        "Estaba en todas partes, menos conmigo.\n\n" +
                        "Me definía por mi rol como trabajadora social.\n" +
                        "La persona que siempre tiene tiempo,\n" +
                        "siempre está para los demás.\n\n" +
                        "El tiempo para mí no existía.\n" +
                        "Y cuando existía, se sentía mal.\n\n" +
                        "Estar sola y en silencio no era algo que me calmara.\n" +
                        "Era algo que me daba miedo.\n\n" +
                        "Hasta que llegó un tiempo en el que todo se volvió quieto.\n" +
                        "Y yo no tenía control sobre eso.\n\n" +
                        "En la pandemia perdí mi trabajo como trabajadora social.\n" +
                        "Me fui a vivir a la jungla.\n" +
                        "Lejos del ruido de la ciudad.\n" +
                        "Sin internet. Sin exigencias. Sin tener que funcionar.\n\n" +
                        "Lo que al principio se sintió como libertad\n" +
                        "en realidad fue mi colapso personal."
                },

                { type: "h2", text: "Cuando el silencio no tiene nada de romántico" },
                {
                    type: "p",
                    text:
                        "Muchas veces se romantiza el silencio:\n" +
                        "como un lugar de claridad, como una experiencia espiritual.\n\n" +
                        "Pero el silencio real no es suave.\n" +
                        "Es honesto.\n\n" +
                        "Sin distracciones, aparecen pensamientos\n" +
                        "que durante mucho tiempo fueron ignorados:"
                },
                { type: "ul", items: ["Miedo", "Vacío", "Dolor", "Agotamiento"] },

                { type: "h2", text: "Una relación que me alejó de mí" },
                {
                    type: "p",
                    text:
                        "Hubo una relación en mi vida\n" +
                        "que me costó algo esencial:\n" +
                        "mi identidad.\n\n" +
                        "Me volví más callada. Más adaptada. Más insegura.\n" +
                        "Empecé a dudar de mí\n" +
                        "porque perdí el contacto conmigo.\n\n" +
                        "Antes de irme a la jungla,\n" +
                        "creí que ya había dejado esa relación atrás.\n" +
                        "Pensé que el tiempo lo curaría todo.\n\n" +
                        "Pero el trauma se vino conmigo.\n\n" +
                        "Recién en el silencio—sin distracción—\n" +
                        "el pasado me alcanzó por completo."
                },

                { type: "h2", text: "Cómo la identidad se va perdiendo en silencio" },
                {
                    type: "p",
                    text:
                        "La identidad casi nunca se pierde de golpe.\n" +
                        "Se va apagando.\n\n" +
                        "Cuando dejás de confiar en tu “no” interno.\n" +
                        "Cuando te adaptás para quedarte.\n" +
                        "Cuando un día ya no sabés\n" +
                        "qué es lo que realmente querés.\n\n" +
                        "El colapso no llegó de repente.\n" +
                        "Yo solo me había dejado de escuchar durante demasiado tiempo."
                },

                {
                    type: "image",
                    src: "/img/blog/03/jungle-tree.webp",
                    alt: "Árbol en la jungla",
                    caption: ""
                },

                { type: "h2", text: "La jungla como espejo" },
                {
                    type: "p",
                    text:
                        "Sola en la jungla, no había nada\n" +
                        "de lo que pudiera sostenerme.\n\n" +
                        "Sin roles.\n" +
                        "Sin expectativas.\n" +
                        "Sin relaciones que me definieran.\n\n" +
                        "Solo silencio.\n" +
                        "Demasiado tiempo.\n" +
                        "Y todas las voces en mi cabeza.\n\n" +
                        "Al principio, ese caos se sintió como una caída.\n" +
                        "Veía el mundo en blanco y negro.\n" +
                        "Me sentía víctima de mi pasado.\n" +
                        "Muchas veces perdía de vista una salida.\n\n" +
                        "Lo que empezó como libertad se volvió mi cárcel interna.\n\n" +
                        "Y justo ahí empezó algo decisivo:\n" +
                        "Por primera vez, me escuché con honestidad.\n" +
                        "Sin distracciones.\n" +
                        "Sin evitar."
                },

                { type: "h2", text: "Lo que aprendí cuando todo se volvió silencio" },
                {
                    type: "p",
                    text:
                        "Yo no estaba perdida.\n" +
                        "Estaba ocupada distrayéndome.\n\n" +
                        "Aprendí que no se puede escapar del propio pasado;\n" +
                        "si no lo mirás, te gobierna.\n\n" +
                        "Aprendí que no existe luz sin sombra.\n" +
                        "Y que sanar no es reprimir,\n" +
                        "sino reconocer."
                },

                { type: "h2", text: "Volver a mí no fue un camino romántico" },
                {
                    type: "p",
                    text:
                        "Mi camino no empezó con una iluminación.\n" +
                        "Empezó con pequeñas decisiones:"
                },
                { type: "ul", items: ["detenerme", "dejar de explicarme", "tomarme en serio", "quedarme cuando se vuelve incómodo"] },
                {
                    type: "p",
                    text:
                        "La reconexión no es una línea recta.\n" +
                        "Nace en el “entre”."
                },

                { type: "h2", text: "Por qué comparto esta historia" },
                {
                    type: "p",
                    text:
                        "Porque muchas personas creen\n" +
                        "que tienen que volverse más fuertes, más intensas o mejores.\n\n" +
                        "Y muchas veces se trata de esto:\n" +
                        "dejar de perderse.\n\n" +
                        "El silencio no es un escape.\n" +
                        "Es un espejo.\n\n" +
                        "Y justo ahí—\n" +
                        "cuando nada te sostiene salvo vos—\n" +
                        "suele empezar un nuevo comienzo."
                },

                {
                    type: "p",
                    text:
                        "Cuando todo se volvió silencio,\n" +
                        "me encontré conmigo.\n\n" +
                        "No como una versión “sanada”.\n" +
                        "Sino como una versión real.\n\n" +
                        "Y ese fue el inicio.\n" +
                        "Mi nuevo comienzo."
                },

                { type: "hr" },

                {
                    type: "p",
                    text:
                        "El silencio en la jungla me mostró muchas cosas.\n" +
                        "Pero no me “quitó” nada.\n\n" +
                        "Lo que vino después no fue una respuesta.\n" +
                        "Fue tiempo.\n\n" +
                        "Tiempo para que lo vivido se asentara.\n" +
                        "Tiempo en el que nada podía acelerarse.\n\n" +
                        "Ahí empezó otra forma de entender:\n\n" +
                        "Por qué la conciencia necesita tiempo."
                }
            ]
        }
    },

    {
    slug: "wenn-antworten-nicht-aus-dem-kopf-kommen",
    category: "inner-experience",
    date: "2026-03-24",
    title: {
        de: "Wenn Antworten nicht aus dem Kopf kommen",
        en: "When answers do not come from the mind",
        es: "Cuando las respuestas no vienen de la mente"
    },
    excerpt: {
        de: "Akasha-Lesung als Raum für innere Klarheit, Bewusstsein und persönliche Entwicklung – für Menschen, die bereits viel verstanden haben und trotzdem spüren, dass etwas tiefer gesehen werden möchte.",
        en: "Akashic reading as a space for inner clarity, awareness, and personal development – for people who have already understood a great deal and still feel that something deeper wants to be seen.",
        es: "La lectura akáshica como un espacio para la claridad interior, la conciencia y el desarrollo personal, para personas que ya han comprendido muchas cosas y aun así sienten que algo más profundo quiere ser visto."
    },
    readingTime: { de: "8 min", en: "8 min", es: "8 min" },
    cover: "/img/blog/04/Jungle.webp",
    content: {
        de: [
            {
                type: "image",
                src: "/img/blog/04/Jungle.webp",
                alt: "Dschungel in Costa Rica",
                caption: ""
            },

            {
                type: "p",
                text:
                    "Es gibt Momente im Leben,\n" +
                    "in denen du bereits vieles verstanden hast.\n\n" +
                    "Du kennst deine Geschichte,\n" +
                    "deinen Charakter,\n" +
                    "deine Muster und Prägungen.\n\n" +
                    "Und trotzdem bleibt dieses Gefühl:\n\n" +
                    "Da ist etwas in mir,\n" +
                    "das ich nicht ganz verstehen kann.\n" +
                    "Und doch beeinflusst es,\n" +
                    "wie ich denke, fühle und lebe."
            },

            { type: "h2", text: "Wenn Denken allein nicht mehr weiterführt" },
            {
                type: "p",
                text:
                    "Vor meiner ersten Akasha-Lesung war ich müde vom Suchen.\n\n" +
                    "Müde vom Analysieren.\n" +
                    "Müde vom Denken.\n\n" +
                    "Ich hatte viel reflektiert,\n" +
                    "Gespräche geführt,\n" +
                    "therapeutische Wege ausprobiert\n" +
                    "und mich intensiv mit innerer Arbeit beschäftigt.\n\n" +
                    "Ich hatte vieles über mich verstanden.\n" +
                    "Und trotzdem blieb etwas offen,\n" +
                    "das sich nicht erklären liess."
            },
            {
                type: "p",
                text:
                    "Ich dachte oft,\n" +
                    "ich hätte Themen bereits verstanden,\n" +
                    "verarbeitet oder losgelassen.\n\n" +
                    "Und doch fühlte es sich an,\n" +
                    "als würde mich etwas immer wieder zurückhalten.\n\n" +
                    "Zudem fühlte ich mich nirgends zuhause.\n" +
                    "Ich reiste weit und oft,\n" +
                    "verliess meine Heimat und kehrte zurück,\n" +
                    "aber fühlte eine innere Sehnsucht,\n" +
                    "die ich nicht beschreiben konnte."
            },
            {
                type: "quote",
                text:
                    "Meine erste Akasha-Lesung war ein tiefes Gefühl\n" +
                    "von gesehen werden,\n" +
                    "jenseits meiner Geschichte und Rollen."
            },
            {
                type: "p",
                text:
                    "Die Lesung fühlte sich an\n" +
                    "wie ein Ankommen,\n" +
                    "ein Nachhausekommen zurück zu mir.\n\n" +
                    "Ich kann es kaum anders beschreiben.\n\n" +
                    "Ein Moment,\n" +
                    "der mir bis heute Gänsehaut macht,\n" +
                    "wenn ich daran denke."
            },
            {
                type: "p",
                text:
                    "Ich bekam Antworten,\n" +
                    "die mich tief berührten.\n\n" +
                    "Antworten,\n" +
                    "die für meinen Kopf nicht logisch waren,\n" +
                    "aber mein Körper erinnerte sich.\n\n" +
                    "Ich spürte Freude,\n" +
                    "Gänsehaut\n" +
                    "und ein tiefes Gefühl von Liebe."
            },

            { type: "h2", text: "Der Moment, in dem plötzlich etwas Sinn ergibt" },
            {
                type: "p",
                text:
                    "In der Lesung wurde nicht mein Problem analysiert.\n\n" +
                    "Sondern mein Ursprung betrachtet.\n\n" +
                    "Nicht das, was „falsch läuft“.\n" +
                    "Sondern das,\n" +
                    "was mich geprägt hat,\n" +
                    "manchmal lange bevor ich Worte dafür hatte."
            },
            {
                type: "p",
                text:
                    "Alte Muster ergaben plötzlich Sinn.\n" +
                    "Nicht als Fehler,\n" +
                    "sondern als Schutz.\n\n" +
                    "Dieser Perspektivwechsel\n" +
                    "hat mehr in mir gelöst\n" +
                    "als jede Analyse zuvor."
            },

            { type: "h2", text: "Was eine Akasha-Lesung nicht ist" },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung ist kein Orakel\n" +
                    "und kein Ersatz für Eigenverantwortung.\n\n" +
                    "Sie nimmt dir keine Entscheidungen ab\n" +
                    "und sagt dir nicht,\n" +
                    "wie du dein Leben führen sollst.\n\n" +
                    "Und genau deshalb\n" +
                    "kann sie so kraftvoll sein."
            },
            {
                type: "p",
                text:
                    "In einer Akasha-Lesung geht es nicht darum,\n" +
                    "Antworten von aussen zu bekommen.\n\n" +
                    "Es geht darum,\n" +
                    "Zugang zu einer Ebene deines Bewusstseins zu öffnen,\n" +
                    "die jenseits von Analyse,\n" +
                    "alten Selbstbildern\n" +
                    "und erlernten Mustern liegt."
            },
            {
                type: "p",
                text:
                    "Viele Menschen versuchen lange,\n" +
                    "ihre Fragen nur mit dem Verstand zu lösen:\n" +
                    "durch Nachdenken,\n" +
                    "Analysieren\n" +
                    "oder das ständige Suchen nach der „richtigen“ Entscheidung.\n\n" +
                    "Eine Akasha-Lesung funktioniert anders."
            },
            {
                type: "p",
                text:
                    "Sie schafft einen Raum,\n" +
                    "in dem innere Klarheit entstehen kann.\n\n" +
                    "Nicht durch Druck oder Bewertung,\n" +
                    "sondern durch ein tieferes Erinnern\n" +
                    "an das,\n" +
                    "was in dir bereits angelegt ist."
            },

            {
                type: "image",
                src: "/img/blog/04/Bridge.webp",
                alt: "Brücke im Grünen",
                caption: ""
            },

            { type: "h2", text: "Was eine Akasha-Lesung dir geben kann" },
            {
                type: "p",
                text:
                    "Viele Menschen kommen mit Fragen,\n" +
                    "die sie lange beschäftigt haben.\n\n" +
                    "Wenn du tiefer verstehen möchtest,\n" +
                    "wie eine <a href='/services/akasha'>Akasha Lesung</a> dich konkret begleiten kann,\n" +
                    "geht es oft um Themen wie diese:\n\n" +
                    "Warum wiederholt sich ein bestimmtes Thema immer wieder in meinem Leben?\n\n" +
                    "Warum fühlt sich etwas blockiert an,\n" +
                    "obwohl ich so viel verstanden habe?\n\n" +
                    "Was möchte in mir gerade wirklich gesehen oder erkannt werden?"
            },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung versucht nicht,\n" +
                    "dein Leben zu analysieren.\n\n" +
                    "Sie öffnet einen Raum,\n" +
                    "in dem sich Zusammenhänge oft auf eine neue Weise zeigen.\n\n" +
                    "Nicht als Theorie,\n" +
                    "sondern als Erfahrung."
            },
            { type: "p", text: "Dabei kann eine Akasha-Lesung helfen," },
            {
                type: "ul",
                items: [
                    "innere Muster und Zusammenhänge zu erkennen, ohne sie sofort bewerten zu müssen",
                    "alte Geschichten loszulassen, ohne sie immer wieder durchleben zu müssen",
                    "dich selbst aus einer tieferen Perspektive wahrzunehmen"
                ]
            },
            {
                type: "p",
                text:
                    "Nicht als Problem,\n" +
                    "das gelöst werden muss,\n" +
                    "sondern als Prozess deiner persönlichen Entwicklung\n" +
                    "und deines Bewusstseins."
            },

            { type: "h2", text: "Das Entscheidende ist nicht die Antwort, sondern der Raum" },
            {
                type: "p",
                text:
                    "In einer Akasha-Lesung geht es selten nur um eine einzelne Antwort.\n\n" +
                    "Oft ist das Wertvollste der Raum,\n" +
                    "der dabei entsteht.\n\n" +
                    "Ein Raum für Bewusstsein.\n" +
                    "Ein Raum für innere Klarheit.\n\n" +
                    "Ein Raum,\n" +
                    "in dem du dich nicht erklären musst.\n" +
                    "Nicht rechtfertigen.\n" +
                    "Nicht „richtig“ machen."
            },
            {
                type: "p",
                text:
                    "Viele Menschen sind es gewohnt,\n" +
                    "sich ständig zu analysieren,\n" +
                    "zu optimieren\n" +
                    "oder Lösungen zu suchen.\n\n" +
                    "Doch echte Veränderung beginnt oft nicht im Denken.\n\n" +
                    "Sie beginnt dort,\n" +
                    "wo du dich selbst ohne Druck wahrnehmen kannst."
            },
            {
                type: "p",
                text:
                    "Genau in diesem Raum\n" +
                    "entsteht häufig eine neue Perspektive\n" +
                    "auf dein Leben,\n" +
                    "deine Muster\n" +
                    "und deine persönliche Entwicklung.\n\n" +
                    "Nicht durch mehr Informationen,\n" +
                    "sondern durch ein tieferes Erkennen."
            },

            { type: "h2", text: "Eine Akasha-Lesung ersetzt kein Leben, aber sie kann es vertiefen" },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung ist kein Ersatz\n" +
                    "für eigene Erfahrungen oder Entscheidungen im Leben.\n\n" +
                    "Doch sie kann helfen,\n" +
                    "dein Leben aus einer tieferen Perspektive zu betrachten."
            },
            {
                type: "p",
                text:
                    "Manchmal erinnert sie dich daran,\n" +
                    "dass du mehr bist als deine Zweifel.\n" +
                    "Mehr als alte Prägungen und Muster.\n" +
                    "Und mehr als die Herausforderungen,\n" +
                    "die sich gerade schwer anfühlen."
            },
            {
                type: "p",
                text:
                    "Diese Erinnerung kann eine neue Form\n" +
                    "von innerer Klarheit entstehen lassen.\n\n" +
                    "Denn oft geht es in einer Akasha-Lesung nicht darum,\n" +
                    "etwas Neues zu „bekommen“.\n\n" +
                    "Sondern darum,\n" +
                    "dich wieder mit einem Teil deines Bewusstseins zu verbinden,\n" +
                    "der bereits in dir vorhanden ist."
            },
            {
                type: "p",
                text:
                    "Während einer Lesung entstehen häufig Bilder,\n" +
                    "Eindrücke oder Botschaften,\n" +
                    "die ich so klar und unverändert wie möglich weitergebe.\n\n" +
                    "So entsteht ein Raum,\n" +
                    "in dem du loslassen darfst.\n" +
                    "Ein Raum für Bewusstsein,\n" +
                    "innere Erkenntnis\n" +
                    "und persönliche Entwicklung."
            },
            {
                type: "p",
                text:
                    "Und manchmal genügt genau dieser Moment der Klarheit,\n" +
                    "um einen inneren Knoten zu lösen\n" +
                    "und dich selbst aus einer neuen Perspektive wahrzunehmen."
            },

            { type: "h2", text: "Wie sich eine Akasha-Lesung anfühlen kann" },
            {
                type: "p",
                text:
                    "Viele Menschen stellen mir nicht zuerst die Frage:\n" +
                    "„Was ist eine Akasha-Lesung?“\n\n" +
                    "Viel öfter fragen sie:\n" +
                    "„Wie fühlt sich eine Akasha-Lesung eigentlich an?“\n\n" +
                    "Denn eine Akasha-Lesung ist weniger eine Methode,\n" +
                    "die man technisch erklären kann.\n\n" +
                    "Sie ist vor allem eine Erfahrung."
            },
            {
                type: "p",
                text:
                    "Eine Erfahrung von Bewusstsein,\n" +
                    "innerer Wahrnehmung\n" +
                    "und Klarheit.\n\n" +
                    "Oft entsteht während einer Lesung ein Raum,\n" +
                    "in dem Gedanken ruhiger werden\n" +
                    "und sich neue Perspektiven zeigen können.\n\n" +
                    "Nicht durch Analyse oder Interpretation,\n" +
                    "sondern durch ein tieferes Spüren."
            },
            { type: "p", text: "Viele Menschen beschreiben danach ein Gefühl von:" },
            {
                type: "ul",
                items: [
                    "innerer Ruhe",
                    "Klarheit über eigene Themen oder Muster",
                    "einem tieferen Verständnis für sich selbst"
                ]
            },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung lässt sich deshalb\n" +
                    "schwer in Worte oder Konzepte fassen.\n\n" +
                    "Sie wird erst wirklich verständlich,\n" +
                    "wenn man sie erlebt."
            },

            { type: "h2", text: "Der Ablauf einer Akasha-Lesung" },
            {
                type: "p",
                text:
                    "Viele Menschen fragen sich vor einer Akasha-Lesung:\n" +
                    "Muss ich eine perfekte Frage mitbringen?\n\n" +
                    "Die Antwort ist: nein."
            },
            {
                type: "p",
                text:
                    "Vor der Sitzung erhältst du von mir\n" +
                    "mögliche Fragestellungen als Orientierung.\n\n" +
                    "Diese Fragen dienen lediglich als Anregung.\n" +
                    "Du kannst sie nutzen,\n" +
                    "verändern\n" +
                    "oder eigene Fragen formulieren."
            },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung braucht keine perfekt formulierten Themen.\n\n" +
                    "Viele Menschen kommen einfach mit einem Gefühl.\n\n" +
                    "Mit innerer Unruhe.\n" +
                    "Mit einem Thema,\n" +
                    "das sich immer wieder im Leben zeigt.\n" +
                    "Oder mit dem stillen Wissen:\n\n" +
                    "Da ist etwas in mir,\n" +
                    "das gesehen werden möchte.\n\n" +
                    "Und das reicht."
            },

            { type: "h2", text: "Der Beginn einer Akasha-Lesung" },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung beginnt nicht mit Analyse\n" +
                    "oder langen Erklärungen.\n\n" +
                    "Sie beginnt mit Ankommen.\n\n" +
                    "Es gibt keinen Druck.\n" +
                    "Kein „Jetzt müssen wir sofort eine Lösung finden“.\n" +
                    "Und kein Ziel,\n" +
                    "das unbedingt erreicht werden muss."
            },
            {
                type: "p",
                text:
                    "Stattdessen entsteht ein Raum,\n" +
                    "in dem du nichts leisten musst.\n\n" +
                    "Viele Menschen beschreiben diesen Moment ähnlich:\n\n" +
                    "„Plötzlich bin ich ganz da.“"
            },

            { type: "h2", text: "Antworten entstehen nicht im Denken" },
            {
                type: "p",
                text:
                    "In einer Akasha-Lesung geht es nicht darum,\n" +
                    "Probleme zu analysieren.\n\n" +
                    "Es geht darum,\n" +
                    "Zusammenhänge zu erkennen,\n" +
                    "die sich im Kopf oft nicht greifen lassen."
            },
            {
                type: "p",
                text:
                    "Manche Antworten kommen als klare Worte.\n" +
                    "Andere als inneres Wissen.\n" +
                    "Manchmal auch einfach als Gefühl von Ordnung.\n\n" +
                    "Nicht alles will verstanden werden.\n\n" +
                    "Aber vieles will gespürt werden."
            },

            { type: "h2", text: "Der Körper reagiert oft früher als der Verstand" },
            { type: "p", text: "Viele Menschen berichten während einer Lesung von" },
            {
                type: "ul",
                items: [
                    "Gänsehaut",
                    "tiefer Ruhe",
                    "einem inneren „Ja“",
                    "dem Gefühl, dass plötzlich etwas Sinn ergibt"
                ]
            },
            {
                type: "p",
                text:
                    "Nicht, weil etwas erklärt wurde.\n\n" +
                    "Sondern weil sich etwas stimmig anfühlt.\n\n" +
                    "Der Kopf fragt vielleicht noch:\n\n" +
                    "Warum berührt mich das so?\n\n" +
                    "Der Körper weiss es längst."
            },

            { type: "h2", text: "Für skeptische Menschen" },
            {
                type: "p",
                text:
                    "Vielleicht liest du diesen Text mit Abstand.\n\n" +
                    "Vielleicht denkst du:\n\n" +
                    "„Ich glaube nicht an so etwas.“\n\n" +
                    "Oder:\n\n" +
                    "„Ich brauche etwas Handfestes.“\n\n" +
                    "Das ist vollkommen in Ordnung.\n" +
                    "Mir ging es anfangs auch so."
            },
            { type: "h2", text: "Du musst an nichts glauben" },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung funktioniert nicht,\n" +
                    "weil du daran glaubst.\n\n" +
                    "Du musst nichts bestätigen.\n" +
                    "Nichts annehmen.\n\n" +
                    "Skepsis ist hier kein Hindernis."
            },
            {
                type: "p",
                text:
                    "Viele Menschen kommen genau deshalb zu mir,\n" +
                    "weil sie keine weiteren Erklärungen mehr wollen,\n" +
                    "sondern eine Erfahrung."
            },

            { type: "h2", text: "Es geht nicht um etwas Übernatürliches" },
            {
                type: "p",
                text:
                    "In einer Lesung geht es nicht um\n"
            },
            {
                type: "ul",
                items: [
                    "Vorhersagen",
                    "spirituelle Rollen",
                    "Heilsversprechen"
                ]
            },
            {
                type: "p",
                text:
                    "Es geht um Wahrnehmung.\n\n" +
                    "Um Klarheit.\n\n" +
                    "Um innere Ordnung.\n\n" +
                    "Und diese Ordnung ist oft überraschend ruhig und nüchtern."
            },

            { type: "h2", text: "Du behältst jederzeit die Kontrolle" },
            {
                type: "p",
                text:
                    "Eine Akasha-Lesung ist kein Machtgefälle.\n\n" +
                    "Sondern ein gemeinsamer Raum."
            },

            { type: "h2", text: "Eine leise Einladung" },
            {
                type: "p",
                text:
                    "Vielleicht liest du diesen Text\n" +
                    "und denkst nicht sofort:\n" +
                    "„Das brauche ich unbedingt.“\n\n" +
                    "Vielleicht spürst du einfach nur:\n" +
                    "Da berührt mich etwas."
            },
            {
                type: "p",
                text:
                    "Manchmal beginnt Veränderung genau so,\n" +
                    "nicht als klare Entscheidung,\n" +
                    "sondern als leises inneres Wahrnehmen."
            },
            {
                type: "p",
                text:
                    "Ich begleite Menschen in 1:1 Akasha-Lesungen,\n" +
                    "die nicht nach schnellen Antworten suchen,\n" +
                    "sondern nach Tiefe,\n" +
                    "innerer Klarheit\n" +
                    "und einem ehrlichen Blick auf sich selbst."
            },
            {
                type: "p",
                text:
                    "Du musst dafür nichts vorbereiten.\n" +
                    "Keine perfekten Fragen formulieren.\n" +
                    "Keine Geschichte erklären."
            },
            {
                type: "p",
                text:
                    "Viele Menschen kommen einfach mit einem Gefühl.\n" +
                    "Mit einem Thema,\n" +
                    "das sich immer wieder zeigt.\n" +
                    "Oder mit dem stillen Wissen,\n" +
                    "dass etwas in ihrem Leben gesehen werden möchte.\n\n" +
                    "Und genau dort beginnt oft der Prozess."
            },
            {
                type: "p",
                text:
                    "Wenn du spürst,\n" +
                    "dass dich dieses Thema anspricht,\n" +
                    "findest du hier mehr Informationen zur <a href='/services/akasha'>1:1 Akasha Lesung</a>\n" +
                    "und zur Möglichkeit,\n" +
                    "eine Sitzung zu buchen."
            },
            {
                type: "p",
                text:
                    "Manchmal beginnt ein neuer Blick auf dein Leben\n" +
                    "nicht mit einer Antwort,\n" +
                    "sondern mit dem Moment,\n" +
                    "in dem du bereit bist,\n" +
                    "dir selbst wirklich zu begegnen."
            }
        ],

        en: [
            {
                type: "image",
                src: "/img/blog/04/Jungle.webp",
                alt: "Jungle in Costa Rica",
                caption: ""
            },

            {
                type: "p",
                text:
                    "There are moments in life\n" +
                    "when you have already understood so much.\n\n" +
                    "You know your story,\n" +
                    "your character,\n" +
                    "your patterns and conditioning.\n\n" +
                    "And still, this feeling remains:\n\n" +
                    "There is something in me\n" +
                    "that I cannot fully understand.\n" +
                    "And yet it influences\n" +
                    "how I think, feel, and live."
            },

            { type: "h2", text: "When thinking alone no longer takes you further" },
            {
                type: "p",
                text:
                    "Before my first Akashic reading,\n" +
                    "I was tired of searching.\n\n" +
                    "Tired of analyzing.\n" +
                    "Tired of thinking.\n\n" +
                    "I had reflected a lot,\n" +
                    "had many conversations,\n" +
                    "tried therapeutic paths,\n" +
                    "and engaged deeply with inner work.\n\n" +
                    "I had understood a lot about myself.\n" +
                    "And still,\n" +
                    "something remained unresolved,\n" +
                    "something that could not be explained."
            },
            {
                type: "p",
                text:
                    "I often thought\n" +
                    "I had already understood,\n" +
                    "processed,\n" +
                    "or let go of certain themes.\n\n" +
                    "And yet it felt\n" +
                    "as if something kept holding me back.\n\n" +
                    "I also felt at home nowhere.\n" +
                    "I traveled far and often,\n" +
                    "left my homeland and returned,\n" +
                    "but carried an inner longing\n" +
                    "I could not describe."
            },
            {
                type: "quote",
                text:
                    "My first Akashic reading felt like being deeply seen,\n" +
                    "beyond my story and my roles."
            },
            {
                type: "p",
                text:
                    "The reading felt like arriving.\n" +
                    "Like coming home,\n" +
                    "back to myself.\n\n" +
                    "I can hardly describe it any other way.\n\n" +
                    "A moment that still gives me goosebumps\n" +
                    "when I think about it."
            },
            {
                type: "p",
                text:
                    "I received answers\n" +
                    "that touched me deeply.\n\n" +
                    "Answers that were not logical to my mind,\n" +
                    "but my body remembered.\n\n" +
                    "I felt joy,\n" +
                    "goosebumps,\n" +
                    "and a deep sense of love."
            },

            { type: "h2", text: "The moment when something suddenly makes sense" },
            {
                type: "p",
                text:
                    "In the reading,\n" +
                    "my problem was not analyzed.\n\n" +
                    "Instead,\n" +
                    "my origin was looked at.\n\n" +
                    "Not what was “going wrong.”\n" +
                    "But what had shaped me,\n" +
                    "sometimes long before I had words for it."
            },
            {
                type: "p",
                text:
                    "Old patterns suddenly made sense.\n" +
                    "Not as mistakes,\n" +
                    "but as protection.\n\n" +
                    "That shift in perspective\n" +
                    "released more within me\n" +
                    "than any analysis before."
            },

            { type: "h2", text: "What an Akashic reading is not" },
            {
                type: "p",
                text:
                    "An Akashic reading is not an oracle\n" +
                    "and not a substitute for personal responsibility.\n\n" +
                    "It does not make decisions for you,\n" +
                    "and it does not tell you\n" +
                    "how to live your life.\n\n" +
                    "And that is exactly why\n" +
                    "it can be so powerful."
            },
            {
                type: "p",
                text:
                    "An Akashic reading is not about\n" +
                    "receiving answers from outside of yourself.\n\n" +
                    "It is about opening access\n" +
                    "to a level of your consciousness\n" +
                    "that lies beyond analysis,\n" +
                    "old self-images,\n" +
                    "and learned patterns."
            },
            {
                type: "p",
                text:
                    "Many people try for a long time\n" +
                    "to solve their questions only through the mind:\n" +
                    "through thinking,\n" +
                    "analyzing,\n" +
                    "or constantly searching for the “right” decision.\n\n" +
                    "An Akashic reading works differently."
            },
            {
                type: "p",
                text:
                    "It creates a space\n" +
                    "in which inner clarity can arise.\n\n" +
                    "Not through pressure or judgment,\n" +
                    "but through a deeper remembering\n" +
                    "of what is already within you."
            },

            {
                type: "image",
                src: "/img/blog/04/Bridge.webp",
                alt: "Bridge in the green landscape",
                caption: ""
            },

            { type: "h2", text: "What an Akashic reading can give you" },
            {
                type: "p",
                text:
                    "Many people come with questions\n" +
                    "that have been with them for a long time.\n\n" +
                    "If you want to understand more deeply\n" +
                    "how an <a href='/services/akasha'>Akashic Reading</a> can support you concretely,\n" +
                    "the questions often sound like this:\n\n" +
                    "Why does a certain theme keep repeating in my life?\n\n" +
                    "Why does something feel blocked,\n" +
                    "even though I have understood so much?\n\n" +
                    "What in me wants to be truly seen or recognized right now?"
            },
            {
                type: "p",
                text:
                    "An Akashic reading does not try\n" +
                    "to analyze your life.\n\n" +
                    "It opens a space\n" +
                    "in which connections often reveal themselves in a new way.\n\n" +
                    "Not as theory,\n" +
                    "but as experience."
            },
            { type: "p", text: "An Akashic reading can help you" },
            {
                type: "ul",
                items: [
                    "recognize inner patterns and connections without having to judge them immediately",
                    "let go of old stories without having to relive them again and again",
                    "perceive yourself from a deeper perspective"
                ]
            },
            {
                type: "p",
                text:
                    "Not as a problem\n" +
                    "that needs to be solved,\n" +
                    "but as a process of your personal development\n" +
                    "and consciousness."
            },

            { type: "h2", text: "What matters most is not the answer, but the space" },
            {
                type: "p",
                text:
                    "In an Akashic reading,\n" +
                    "it is rarely only about one single answer.\n\n" +
                    "Often the most valuable part\n" +
                    "is the space that opens.\n\n" +
                    "A space for awareness.\n" +
                    "A space for inner clarity.\n\n" +
                    "A space\n" +
                    "where you do not have to explain yourself.\n" +
                    "Not justify.\n" +
                    "Not get it “right.”"
            },
            {
                type: "p",
                text:
                    "Many people are used to\n" +
                    "constantly analyzing themselves,\n" +
                    "optimizing,\n" +
                    "or searching for solutions.\n\n" +
                    "But real change often does not begin in thinking.\n\n" +
                    "It begins where you can perceive yourself\n" +
                    "without pressure."
            },
            {
                type: "p",
                text:
                    "Exactly in that space,\n" +
                    "a new perspective often emerges\n" +
                    "on your life,\n" +
                    "your patterns,\n" +
                    "and your personal development.\n\n" +
                    "Not through more information,\n" +
                    "but through deeper recognition."
            },

            { type: "h2", text: "An Akashic reading does not replace life, but it can deepen it" },
            {
                type: "p",
                text:
                    "An Akashic reading is not a substitute\n" +
                    "for your own experiences or decisions in life.\n\n" +
                    "But it can help you\n" +
                    "see your life from a deeper perspective."
            },
            {
                type: "p",
                text:
                    "Sometimes it reminds you\n" +
                    "that you are more than your doubts.\n" +
                    "More than old imprints and patterns.\n" +
                    "And more than the challenges\n" +
                    "that feel heavy right now."
            },
            {
                type: "p",
                text:
                    "This remembrance can allow\n" +
                    "a new form of inner clarity to arise.\n\n" +
                    "Because often,\n" +
                    "an Akashic reading is not about receiving something new.\n\n" +
                    "It is about reconnecting\n" +
                    "with a part of your consciousness\n" +
                    "that is already present within you."
            },
            {
                type: "p",
                text:
                    "During a reading,\n" +
                    "images, impressions,\n" +
                    "or messages often arise,\n" +
                    "which I pass on as clearly\n" +
                    "and unchanged as possible.\n\n" +
                    "This creates a space\n" +
                    "in which you are allowed to let go.\n" +
                    "A space for awareness,\n" +
                    "inner insight,\n" +
                    "and personal development."
            },
            {
                type: "p",
                text:
                    "And sometimes,\n" +
                    "that single moment of clarity is enough\n" +
                    "to loosen an inner knot\n" +
                    "and allow you to perceive yourself\n" +
                    "from a new perspective."
            },

            { type: "h2", text: "How an Akashic reading can feel" },
            {
                type: "p",
                text:
                    "Many people do not first ask me:\n" +
                    "“What is an Akashic reading?”\n\n" +
                    "Much more often they ask:\n" +
                    "“What does an Akashic reading actually feel like?”\n\n" +
                    "Because an Akashic reading\n" +
                    "is less a method\n" +
                    "that can be explained technically.\n\n" +
                    "Above all,\n" +
                    "it is an experience."
            },
            {
                type: "p",
                text:
                    "An experience of awareness,\n" +
                    "inner perception,\n" +
                    "and clarity.\n\n" +
                    "During a reading,\n" +
                    "a space often emerges\n" +
                    "in which thoughts grow quieter\n" +
                    "and new perspectives can appear.\n\n" +
                    "Not through analysis or interpretation,\n" +
                    "but through deeper sensing."
            },
            { type: "p", text: "Many people describe afterwards a feeling of" },
            {
                type: "ul",
                items: [
                    "inner calm",
                    "clarity about their own themes or patterns",
                    "a deeper understanding of themselves"
                ]
            },
            {
                type: "p",
                text:
                    "That is why an Akashic reading\n" +
                    "is difficult to capture fully in words or concepts.\n\n" +
                    "It only becomes truly understandable\n" +
                    "when you experience it."
            },

            { type: "h2", text: "The process of an Akashic reading" },
            {
                type: "p",
                text:
                    "Many people wonder before an Akashic reading:\n" +
                    "Do I need to bring a perfect question?\n\n" +
                    "The answer is: no."
            },
            {
                type: "p",
                text:
                    "Before the session,\n" +
                    "I send possible question prompts for orientation.\n\n" +
                    "These questions are simply invitations.\n" +
                    "You can use them,\n" +
                    "change them,\n" +
                    "or formulate your own."
            },
            {
                type: "p",
                text:
                    "An Akashic reading does not require\n" +
                    "perfectly formulated themes.\n\n" +
                    "Many people simply come with a feeling.\n\n" +
                    "With inner restlessness.\n" +
                    "With a theme\n" +
                    "that keeps showing up in life.\n" +
                    "Or with the quiet knowing:\n\n" +
                    "There is something in me\n" +
                    "that wants to be seen.\n\n" +
                    "And that is enough."
            },

            { type: "h2", text: "The beginning of an Akashic reading" },
            {
                type: "p",
                text:
                    "An Akashic reading does not begin with analysis\n" +
                    "or long explanations.\n\n" +
                    "It begins with arriving.\n\n" +
                    "There is no pressure.\n" +
                    "No “We have to find a solution right away.”\n" +
                    "And no goal\n" +
                    "that must absolutely be reached."
            },
            {
                type: "p",
                text:
                    "Instead,\n" +
                    "a space opens\n" +
                    "in which you do not have to perform anything.\n\n" +
                    "Many people describe that moment similarly:\n\n" +
                    "“Suddenly, I am fully here.”"
            },

            { type: "h2", text: "Answers do not arise in thinking" },
            {
                type: "p",
                text:
                    "An Akashic reading is not about\n" +
                    "analyzing problems.\n\n" +
                    "It is about recognizing connections\n" +
                    "that the mind often cannot grasp."
            },
            {
                type: "p",
                text:
                    "Some answers come as clear words.\n" +
                    "Others as inner knowing.\n" +
                    "Sometimes simply as a feeling of order.\n\n" +
                    "Not everything wants to be understood.\n\n" +
                    "But much wants to be felt."
            },

            { type: "h2", text: "The body often responds before the mind" },
            { type: "p", text: "Many people report during a reading" },
            {
                type: "ul",
                items: [
                    "goosebumps",
                    "deep calm",
                    "an inner “yes”",
                    "the feeling that something suddenly makes sense"
                ]
            },
            {
                type: "p",
                text:
                    "Not because something was explained.\n\n" +
                    "But because something feels deeply aligned.\n\n" +
                    "The mind may still ask:\n\n" +
                    "Why does this touch me so much?\n\n" +
                    "The body already knows."
            },

            { type: "h2", text: "For skeptical people" },
            {
                type: "p",
                text:
                    "Maybe you are reading this text with some distance.\n\n" +
                    "Maybe you think:\n\n" +
                    "“I do not believe in something like this.”\n\n" +
                    "Or:\n\n" +
                    "“I need something tangible.”\n\n" +
                    "That is completely okay.\n" +
                    "That is how I felt in the beginning too."
            },
            { type: "h2", text: "You do not have to believe in anything" },
            {
                type: "p",
                text:
                    "An Akashic reading does not work\n" +
                    "because you believe in it.\n\n" +
                    "You do not have to confirm anything.\n" +
                    "You do not have to accept anything.\n\n" +
                    "Skepticism is not an obstacle here."
            },
            {
                type: "p",
                text:
                    "Many people come to me for exactly that reason:\n" +
                    "because they do not want more explanations,\n" +
                    "but an experience."
            },

            { type: "h2", text: "This is not about something supernatural" },
            {
                type: "p",
                text:
                    "A reading is not about"
            },
            {
                type: "ul",
                items: [
                    "predictions",
                    "spiritual roles",
                    "promises of healing"
                ]
            },
            {
                type: "p",
                text:
                    "It is about perception.\n\n" +
                    "About clarity.\n\n" +
                    "About inner order.\n\n" +
                    "And that order is often surprisingly quiet and grounded."
            },

            { type: "h2", text: "You remain in control at all times" },
            {
                type: "p",
                text:
                    "An Akashic reading is not a power imbalance.\n\n" +
                    "It is a shared space."
            },

            { type: "h2", text: "A quiet invitation" },
            {
                type: "p",
                text:
                    "Maybe you are reading this\n" +
                    "and do not immediately think:\n" +
                    "“I absolutely need this.”\n\n" +
                    "Maybe you simply notice:\n" +
                    "Something in this touches me."
            },
            {
                type: "p",
                text:
                    "Sometimes change begins exactly like that.\n\n" +
                    "Not as a clear decision,\n" +
                    "but as a quiet inner noticing."
            },
            {
                type: "p",
                text:
                    "I accompany people in 1:1 Akashic readings\n" +
                    "who are not looking for quick answers,\n" +
                    "but for depth,\n" +
                    "inner clarity,\n" +
                    "and an honest view of themselves."
            },
            {
                type: "p",
                text:
                    "You do not need to prepare anything for this.\n" +
                    "No perfectly formulated questions.\n" +
                    "No story you have to explain."
            },
            {
                type: "p",
                text:
                    "Many people simply come with a feeling.\n" +
                    "With a theme\n" +
                    "that keeps repeating itself.\n" +
                    "Or with the quiet knowing\n" +
                    "that something in their life wants to be seen.\n\n" +
                    "And that is often where the process begins."
            },
            {
                type: "p",
                text:
                    "If you feel\n" +
                    "that this topic speaks to you,\n" +
                    "you can find more information here\n" +
                    "about the <a href='/services/akasha'>1:1 Akashic Reading</a>\n" +
                    "and the possibility of booking a session."
            },
            {
                type: "p",
                text:
                    "Sometimes a new way of seeing your life\n" +
                    "does not begin with an answer,\n" +
                    "but with the moment\n" +
                    "you are ready\n" +
                    "to truly meet yourself."
            }
        ],

        es: [
            {
                type: "image",
                src: "/img/blog/04/Jungle.webp",
                alt: "Jungla en Costa Rica",
                caption: ""
            },

            {
                type: "p",
                text:
                    "Hay momentos en la vida\n" +
                    "en los que ya has comprendido muchas cosas.\n\n" +
                    "Conoces tu historia,\n" +
                    "tu carácter,\n" +
                    "tus patrones y condicionamientos.\n\n" +
                    "Y aun así,\n" +
                    "permanece esta sensación:\n\n" +
                    "Hay algo en mí\n" +
                    "que no logro comprender del todo.\n" +
                    "Y sin embargo influye\n" +
                    "en cómo pienso,\n" +
                    "siento y vivo."
            },

            { type: "h2", text: "Cuando pensar ya no te lleva más lejos" },
            {
                type: "p",
                text:
                    "Antes de mi primera lectura de Akasha,\n" +
                    "estaba cansada de buscar.\n\n" +
                    "Cansada de analizar.\n" +
                    "Cansada de pensar.\n\n" +
                    "Había reflexionado mucho,\n" +
                    "tenido conversaciones,\n" +
                    "probado caminos terapéuticos\n" +
                    "y me había involucrado intensamente en el trabajo interior.\n\n" +
                    "Había comprendido muchas cosas sobre mí.\n" +
                    "Y aun así,\n" +
                    "quedaba algo abierto,\n" +
                    "algo que no podía explicarse."
            },
            {
                type: "p",
                text:
                    "Muchas veces pensaba\n" +
                    "que ya había entendido,\n" +
                    "procesado\n" +
                    "o soltado ciertos temas.\n\n" +
                    "Y sin embargo se sentía\n" +
                    "como si algo siguiera reteniéndome.\n\n" +
                    "Además,\n" +
                    "no me sentía en casa en ningún lugar.\n" +
                    "Viajaba lejos y con frecuencia,\n" +
                    "dejaba mi tierra y regresaba,\n" +
                    "pero llevaba dentro una nostalgia\n" +
                    "que no podía describir."
            },
            {
                type: "quote",
                text:
                    "Mi primera lectura de Akasha fue una profunda sensación\n" +
                    "de ser vista,\n" +
                    "más allá de mi historia y de mis roles."
            },
            {
                type: "p",
                text:
                    "La lectura se sintió\n" +
                    "como llegar.\n" +
                    "Como volver a casa,\n" +
                    "de regreso a mí.\n\n" +
                    "Casi no puedo describirlo de otra manera.\n\n" +
                    "Es un momento\n" +
                    "que hasta hoy me da escalofríos\n" +
                    "cuando lo recuerdo."
            },
            {
                type: "p",
                text:
                    "Recibí respuestas\n" +
                    "que me tocaron profundamente.\n\n" +
                    "Respuestas que no eran lógicas para mi mente,\n" +
                    "pero mi cuerpo las recordaba.\n\n" +
                    "Sentí alegría,\n" +
                    "escalofríos,\n" +
                    "y una profunda sensación de amor."
            },

            { type: "h2", text: "El momento en que algo de pronto cobra sentido" },
            {
                type: "p",
                text:
                    "En la lectura\n" +
                    "no se analizó mi problema.\n\n" +
                    "Se miró mi origen.\n\n" +
                    "No lo que estaba “mal”.\n" +
                    "Sino aquello que me había marcado,\n" +
                    "a veces mucho antes de que tuviera palabras para ello."
            },
            {
                type: "p",
                text:
                    "Viejos patrones de pronto cobraron sentido.\n" +
                    "No como errores,\n" +
                    "sino como protección.\n\n" +
                    "Ese cambio de perspectiva\n" +
                    "soltó más cosas dentro de mí\n" +
                    "que cualquier análisis anterior."
            },

            { type: "h2", text: "Lo que una lectura de Akasha no es" },
            {
                type: "p",
                text:
                    "Una lectura de Akasha no es un oráculo\n" +
                    "ni un reemplazo de la responsabilidad personal.\n\n" +
                    "No toma decisiones por vos,\n" +
                    "ni te dice\n" +
                    "cómo deberías vivir tu vida.\n\n" +
                    "Y justamente por eso\n" +
                    "puede ser tan poderosa."
            },
            {
                type: "p",
                text:
                    "En una lectura de Akasha\n" +
                    "no se trata de recibir respuestas desde afuera.\n\n" +
                    "Se trata de abrir acceso\n" +
                    "a un nivel de tu conciencia\n" +
                    "que está más allá del análisis,\n" +
                    "de las viejas imágenes de vos misma\n" +
                    "y de los patrones aprendidos."
            },
            {
                type: "p",
                text:
                    "Muchas personas intentan durante mucho tiempo\n" +
                    "resolver sus preguntas solo con la mente:\n" +
                    "pensando,\n" +
                    "analizando,\n" +
                    "o buscando constantemente la decisión “correcta”.\n\n" +
                    "Una lectura de Akasha funciona de otra manera."
            },
            {
                type: "p",
                text:
                    "Crea un espacio\n" +
                    "en el que puede surgir claridad interior.\n\n" +
                    "No a través de presión o juicio,\n" +
                    "sino a través de un recuerdo más profundo\n" +
                    "de aquello que ya existe en vos."
            },

            {
                type: "image",
                src: "/img/blog/04/Bridge.webp",
                alt: "Puente en el paisaje verde",
                caption: ""
            },

            { type: "h2", text: "Lo que una lectura de Akasha puede darte" },
            {
                type: "p",
                text:
                    "Muchas personas llegan con preguntas\n" +
                    "que las han acompañado durante mucho tiempo.\n\n" +
                    "Si querés comprender más profundamente\n" +
                    "cómo una <a href='/services/akasha'>lectura akáshica</a> puede acompañarte de forma concreta,\n" +
                    "las preguntas suelen sonar así:\n\n" +
                    "¿Por qué se repite una y otra vez un determinado tema en mi vida?\n\n" +
                    "¿Por qué algo se siente bloqueado,\n" +
                    "aunque ya haya comprendido tanto?\n\n" +
                    "¿Qué quiere realmente ser visto o reconocido en mí en este momento?"
            },
            {
                type: "p",
                text:
                    "Una lectura de Akasha\n" +
                    "no intenta analizar tu vida.\n\n" +
                    "Abre un espacio\n" +
                    "en el que las conexiones suelen mostrarse de una manera nueva.\n\n" +
                    "No como teoría,\n" +
                    "sino como experiencia."
            },
            { type: "p", text: "Una lectura de Akasha puede ayudarte a" },
            {
                type: "ul",
                items: [
                    "reconocer patrones internos y conexiones sin tener que juzgarlos de inmediato",
                    "soltar historias viejas sin tener que revivirlas una y otra vez",
                    "percibirte desde una perspectiva más profunda"
                ]
            },
            {
                type: "p",
                text:
                    "No como un problema\n" +
                    "que debe resolverse,\n" +
                    "sino como un proceso de tu desarrollo personal\n" +
                    "y de tu conciencia."
            },

            { type: "h2", text: "Lo decisivo no es la respuesta, sino el espacio" },
            {
                type: "p",
                text:
                    "En una lectura de Akasha,\n" +
                    "raras veces se trata solo de una única respuesta.\n\n" +
                    "Muchas veces,\n" +
                    "lo más valioso es el espacio que se abre.\n\n" +
                    "Un espacio para la conciencia.\n" +
                    "Un espacio para la claridad interior.\n\n" +
                    "Un espacio\n" +
                    "en el que no tenés que explicarte.\n" +
                    "Ni justificarte.\n" +
                    "Ni hacerlo “bien”."
            },
            {
                type: "p",
                text:
                    "Muchas personas están acostumbradas\n" +
                    "a analizarse constantemente,\n" +
                    "optimizarse\n" +
                    "o buscar soluciones.\n\n" +
                    "Pero el cambio real\n" +
                    "muchas veces no comienza en el pensamiento.\n\n" +
                    "Comienza allí\n" +
                    "donde podés percibirte sin presión."
            },
            {
                type: "p",
                text:
                    "Y justo en ese espacio\n" +
                    "suele surgir una nueva perspectiva\n" +
                    "sobre tu vida,\n" +
                    "tus patrones,\n" +
                    "y tu desarrollo personal.\n\n" +
                    "No por más información,\n" +
                    "sino por un reconocimiento más profundo."
            },

            { type: "h2", text: "Una lectura de Akasha no reemplaza la vida, pero puede profundizarla" },
            {
                type: "p",
                text:
                    "Una lectura de Akasha\n" +
                    "no reemplaza tus propias experiencias\n" +
                    "o decisiones en la vida.\n\n" +
                    "Pero puede ayudarte\n" +
                    "a mirar tu vida desde una perspectiva más profunda."
            },
            {
                type: "p",
                text:
                    "A veces te recuerda\n" +
                    "que sos más que tus dudas.\n" +
                    "Más que tus viejos condicionamientos y patrones.\n" +
                    "Y más que los desafíos\n" +
                    "que hoy se sienten pesados."
            },
            {
                type: "p",
                text:
                    "Ese recuerdo puede permitir\n" +
                    "que surja una nueva forma de claridad interior.\n\n" +
                    "Porque muchas veces,\n" +
                    "en una lectura de Akasha,\n" +
                    "no se trata de “obtener” algo nuevo.\n\n" +
                    "Sino de volver a conectarte\n" +
                    "con una parte de tu conciencia\n" +
                    "que ya está presente en vos."
            },
            {
                type: "p",
                text:
                    "Durante una lectura,\n" +
                    "suelen aparecer imágenes,\n" +
                    "impresiones\n" +
                    "o mensajes,\n" +
                    "que transmito con la mayor claridad\n" +
                    "y fidelidad posible.\n\n" +
                    "Así se crea un espacio\n" +
                    "en el que podés soltar.\n" +
                    "Un espacio para la conciencia,\n" +
                    "la comprensión interior,\n" +
                    "y el desarrollo personal."
            },
            {
                type: "p",
                text:
                    "Y a veces,\n" +
                    "ese solo momento de claridad\n" +
                    "alcanza para soltar un nudo interno\n" +
                    "y empezar a percibirte\n" +
                    "desde una nueva perspectiva."
            },

            { type: "h2", text: "Cómo puede sentirse una lectura de Akasha" },
            {
                type: "p",
                text:
                    "Muchas personas no me preguntan primero:\n" +
                    "“¿Qué es una lectura de Akasha?”\n\n" +
                    "Mucho más a menudo preguntan:\n" +
                    "“¿Cómo se siente realmente una lectura de Akasha?”\n\n" +
                    "Porque una lectura de Akasha\n" +
                    "es menos un método\n" +
                    "que puede explicarse técnicamente.\n\n" +
                    "Sobre todo,\n" +
                    "es una experiencia."
            },
            {
                type: "p",
                text:
                    "Una experiencia de conciencia,\n" +
                    "de percepción interna,\n" +
                    "y de claridad.\n\n" +
                    "Durante una lectura,\n" +
                    "suele abrirse un espacio\n" +
                    "en el que los pensamientos se aquietan\n" +
                    "y pueden aparecer nuevas perspectivas.\n\n" +
                    "No a través del análisis o la interpretación,\n" +
                    "sino a través de un sentir más profundo."
            },
            { type: "p", text: "Muchas personas describen después una sensación de" },
            {
                type: "ul",
                items: [
                    "calma interior",
                    "claridad sobre sus propios temas o patrones",
                    "una comprensión más profunda de sí mismas"
                ]
            },
            {
                type: "p",
                text:
                    "Por eso,\n" +
                    "una lectura de Akasha\n" +
                    "es difícil de encerrar en palabras o conceptos.\n\n" +
                    "Solo se vuelve realmente comprensible\n" +
                    "cuando se la vive."
            },

            { type: "h2", text: "El proceso de una lectura de Akasha" },
            {
                type: "p",
                text:
                    "Muchas personas se preguntan antes de una lectura de Akasha:\n" +
                    "¿Tengo que llevar una pregunta perfecta?\n\n" +
                    "La respuesta es: no."
            },
            {
                type: "p",
                text:
                    "Antes de la sesión,\n" +
                    "recibís de mi parte posibles preguntas orientativas.\n\n" +
                    "Estas preguntas son solo una invitación.\n" +
                    "Podés usarlas,\n" +
                    "cambiarlas,\n" +
                    "o formular tus propias preguntas."
            },
            {
                type: "p",
                text:
                    "Una lectura de Akasha\n" +
                    "no necesita temas perfectamente formulados.\n\n" +
                    "Muchas personas simplemente llegan con una sensación.\n\n" +
                    "Con inquietud interior.\n" +
                    "Con un tema\n" +
                    "que vuelve a aparecer una y otra vez.\n" +
                    "O con el saber silencioso de que:\n\n" +
                    "Hay algo en mí\n" +
                    "que quiere ser visto.\n\n" +
                    "Y eso es suficiente."
            },

            { type: "h2", text: "El comienzo de una lectura de Akasha" },
            {
                type: "p",
                text:
                    "Una lectura de Akasha\n" +
                    "no empieza con análisis\n" +
                    "ni con largas explicaciones.\n\n" +
                    "Empieza con llegar.\n\n" +
                    "No hay presión.\n" +
                    "No hay un “tenemos que encontrar una solución ya mismo”.\n" +
                    "Y no hay una meta\n" +
                    "que deba alcanzarse a toda costa."
            },
            {
                type: "p",
                text:
                    "En cambio,\n" +
                    "se abre un espacio\n" +
                    "en el que no tenés que rendir.\n\n" +
                    "Muchas personas describen ese momento de forma parecida:\n\n" +
                    "“De repente,\n" +
                    "estoy completamente acá.”"
            },

            { type: "h2", text: "Las respuestas no surgen en el pensamiento" },
            {
                type: "p",
                text:
                    "En una lectura de Akasha\n" +
                    "no se trata de analizar problemas.\n\n" +
                    "Se trata de reconocer conexiones\n" +
                    "que la mente muchas veces no puede captar."
            },
            {
                type: "p",
                text:
                    "Algunas respuestas llegan como palabras claras.\n" +
                    "Otras,\n" +
                    "como un saber interno.\n" +
                    "Y a veces,\n" +
                    "simplemente como una sensación de orden.\n\n" +
                    "No todo quiere ser entendido.\n\n" +
                    "Pero muchas cosas quieren ser sentidas."
            },

            { type: "h2", text: "El cuerpo muchas veces responde antes que la mente" },
            { type: "p", text: "Muchas personas relatan durante una lectura" },
            {
                type: "ul",
                items: [
                    "escalofríos",
                    "calma profunda",
                    "un “sí” interno",
                    "la sensación de que algo de pronto cobra sentido"
                ]
            },
            {
                type: "p",
                text:
                    "No porque algo haya sido explicado.\n\n" +
                    "Sino porque algo se siente profundamente coherente.\n\n" +
                    "La mente quizá todavía pregunte:\n\n" +
                    "¿Por qué esto me toca tanto?\n\n" +
                    "El cuerpo ya lo sabe."
            },

            { type: "h2", text: "Para personas escépticas" },
            {
                type: "p",
                text:
                    "Tal vez estás leyendo este texto con distancia.\n\n" +
                    "Tal vez pensás:\n\n" +
                    "“Yo no creo en algo así.”\n\n" +
                    "O:\n\n" +
                    "“Necesito algo concreto.”\n\n" +
                    "Y eso está completamente bien.\n" +
                    "A mí también me pasó al principio."
            },
            { type: "h2", text: "No tenés que creer en nada" },
            {
                type: "p",
                text:
                    "Una lectura de Akasha\n" +
                    "no funciona porque creas en ella.\n\n" +
                    "No tenés que confirmar nada.\n" +
                    "No tenés que aceptar nada.\n\n" +
                    "El escepticismo no es un obstáculo aquí."
            },
            {
                type: "p",
                text:
                    "Muchas personas llegan precisamente por eso:\n" +
                    "porque ya no quieren más explicaciones,\n" +
                    "sino una experiencia."
            },

            { type: "h2", text: "No se trata de algo sobrenatural" },
            {
                type: "p",
                text:
                    "En una lectura\n" +
                    "no se trata de"
            },
            {
                type: "ul",
                items: [
                    "predicciones",
                    "roles espirituales",
                    "promesas de sanación"
                ]
            },
            {
                type: "p",
                text:
                    "Se trata de percepción.\n\n" +
                    "De claridad.\n\n" +
                    "De orden interno.\n\n" +
                    "Y ese orden,\n" +
                    "muchas veces,\n" +
                    "es sorprendentemente sereno y sobrio."
            },

            { type: "h2", text: "Mantenés el control en todo momento" },
            {
                type: "p",
                text:
                    "Una lectura de Akasha\n" +
                    "no es una relación de poder desigual.\n\n" +
                    "Es un espacio compartido."
            },

            { type: "h2", text: "Una invitación silenciosa" },
            {
                type: "p",
                text:
                    "Tal vez estás leyendo este texto\n" +
                    "y no pensás de inmediato:\n" +
                    "“Necesito esto sí o sí.”\n\n" +
                    "Tal vez simplemente notás:\n" +
                    "Hay algo en esto que me toca."
            },
            {
                type: "p",
                text:
                    "A veces,\n" +
                    "el cambio empieza exactamente así.\n\n" +
                    "No como una decisión clara,\n" +
                    "sino como una percepción interna silenciosa."
            },
            {
                type: "p",
                text:
                    "Acompaño a personas en lecturas de Akasha 1:1\n" +
                    "que no están buscando respuestas rápidas,\n" +
                    "sino profundidad,\n" +
                    "claridad interior,\n" +
                    "y una mirada honesta sobre sí mismas."
            },
            {
                type: "p",
                text:
                    "No tenés que preparar nada para eso.\n" +
                    "No hace falta formular preguntas perfectas.\n" +
                    "No hace falta explicar tu historia."
            },
            {
                type: "p",
                text:
                    "Muchas personas simplemente llegan con una sensación.\n" +
                    "Con un tema\n" +
                    "que vuelve a mostrarse una y otra vez.\n" +
                    "O con el saber silencioso\n" +
                    "de que algo en su vida quiere ser visto.\n\n" +
                    "Y muchas veces,\n" +
                    "ahí mismo empieza el proceso."
            },
            {
                type: "p",
                text:
                    "Si sentís\n" +
                    "que este tema te habla,\n" +
                    "acá encontrás más información\n" +
                    "sobre la <a href='/services/akasha'>lectura akáshica 1:1</a>\n" +
                    "y sobre la posibilidad\n" +
                    "de reservar una sesión."
            },
            {
                type: "p",
                text:
                    "A veces,\n" +
                    "una nueva manera de mirar tu vida\n" +
                    "no empieza con una respuesta,\n" +
                    "sino con el momento\n" +
                    "en que estás lista\n" +
                    "para encontrarte de verdad con vos misma."
            }
        ]
    },
    tags: {
        de: ["Akasha", "Bewusstsein", "innere Klarheit", "persönliche Entwicklung"],
        en: ["Akashic reading", "awareness", "inner clarity", "personal development"],
        es: ["lectura akáshica", "conciencia", "claridad interior", "desarrollo personal"]
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