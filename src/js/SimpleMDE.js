var markdownContent = `
# Exemplo de Markdown
**Este é um exemplo de texto em negrito**
- Lista não ordenada
- Outro item

## Subtítulo

E aqui vai um parágrafo de texto para mostrar como funciona a formatação em Markdown.
`;

var simplemde = new SimpleMDE({
    element: document.querySelector(".simplemde"),
    forceSync: true,
    spellChecker: false,
    initialValue: markdownContent,
    toolbar: [
        {
            name: "bold",
            action: SimpleMDE.toggleBold,
            className: "fa fa-bold",
            title: "Bold"
        },
        {
            name: "italic",
            action: SimpleMDE.toggleItalic,
            className: "fa fa-italic",
            title: "Italic"
        },
        {
            name: "heading",
            action: SimpleMDE.toggleHeadingSmaller,
            className: "fa fa-header",
            title: "Heading"
        },
        {
            name: "quote",
            action: SimpleMDE.toggleBlockquote,
            className: "fa fa-quote-left",
            title: "Quote"
        },
        {
            name: "unordered-list",
            action: SimpleMDE.toggleUnorderedList,
            className: "fa fa-list-ul",
            title: "Unordered List"
        },
        {
            name: "ordered-list",
            action: SimpleMDE.toggleOrderedList,
            className: "fa fa-list-ol",
            title: "Ordered List"
        },
        {
            name: "link",
            action: SimpleMDE.drawLink,
            className: "fa fa-link",
            title: "Link"
        },
        {
            name: "image",
            action: SimpleMDE.drawImage,
            className: "fa fa-image",
            title: "Insert Image"
        },
        {
            name: "preview",
            action: SimpleMDE.togglePreview,
            className: "fa fa-eye no-disable",
            title: "Preview"
        },
        {
            name: "side-by-side",
            action: SimpleMDE.toggleSideBySide,
            className: "fa fa-columns no-disable no-mobile",
            title: "Side by Side"
        },
        {
            name: "fullscreen",
            action: SimpleMDE.toggleFullScreen,
            className: "fa fa-arrows-alt no-disable no-mobile",
            title: "Fullscreen"
        },
        {
            name: "guide",
            action: "https://simplemde.com/markdown-guide",
            className: "fa fa-question-circle",
            title: "Markdown Guide"
        }
    ]
});