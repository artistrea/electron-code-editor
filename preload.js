const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    textArea = document.getElementById('text-editor')
    const fileName = 'testfile.txt'

    ipcRenderer.invoke('getInitialText', fileName).then((data, b) => {
        console.log(data, b)
        textArea.value = data
    })

    textArea.addEventListener('keypress', (e) => {
        if (e.key === 's' && e.ctrlKey) ipcRenderer.send('saveText', {fileName  , value: textArea.value})
    })
})  
