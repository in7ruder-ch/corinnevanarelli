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