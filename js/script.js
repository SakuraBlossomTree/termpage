document.addEventListener('DOMContentLoaded', function () {
    const commandInput = document.getElementById('commandInput');

    commandInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleCommand(commandInput.value);
            commandInput.value = ''; // Clear the input after handling the command
        } else if (event.key === 'Tab') {
            event.preventDefault();
            autocompleteBookmark(commandInput.value);
        }
    });

    function isURL(command) {
        return command.includes('.');
    }

    function autocompleteBookmark(command) {
        if (isURL(command)) {
            window.location.href = `https://${encodeURIComponent(command)}`; // Redirect to the entered URL directly
        } else {
            const bookmarks = [
                'Github',
                'Twitter',
                'Discord',
                'ChatGPT',
                'Youtube',
                'Monkeytype',
                'Arch Linux Wiki',
                'DuckDuckGo'
            ];

            const matchingBookmarks = bookmarks.filter(bookmark =>
                bookmark.toLowerCase().startsWith(command.toLowerCase())
            );

            if (matchingBookmarks.length > 0) {
                const currentIndex = matchingBookmarks.indexOf(command.toLowerCase());
                const nextIndex = (currentIndex + 1) % matchingBookmarks.length;
                commandInput.value = matchingBookmarks[nextIndex];
            }
        }
    }

    function handleCommand(command) {
        if (isURL(command)) {
            window.location.href = `https://${encodeURIComponent(command)}`; // Redirect to the entered URL directly
        } else {
            const bookmarks = [
                { name: 'Github', url: 'https://github.com/' },
                { name: 'Twitter', url: 'https://twitter.com/' },
                { name: 'Discord', url: 'https://discord.com/' },
                { name: 'ChatGPT', url: 'https://chat.openai.com/' },
                { name: 'Youtube', url: 'https://www.youtube.com/' },
                { name: 'Monkeytype', url: 'https://monkeytype.com/' },
                { name: 'Arch Linux Wiki', url: 'https://wiki.archlinux.org/' },
                { name: 'DuckDuckGo' , url: 'https://duck.com'}
            ];

            const matchingBookmark = bookmarks.find(bookmark => bookmark.name.toLowerCase() === command.toLowerCase());

            if (matchingBookmark) {
                window.location.href = matchingBookmark.url;
            } else {
                searchDuckDuckGo(command);
            }
        }
    }

    function searchDuckDuckGo(query) {
        window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }
});
