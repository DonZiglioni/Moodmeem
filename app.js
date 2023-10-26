// ********    GET FORM FIELDS    *****
const submitBtn = document.querySelector('.submit-btn')
const memeForm = document.querySelector('#meme-form')
const imageUrl = document.querySelector('input[name="img-link"]')
const topTextInput = document.querySelector('input[name="top-text"]')
const botTextInput = document.querySelector('input[name="bot-text"]')
const moods = document.getElementsByName('moods')
const memeSection = document.querySelector('.memes')
const happySound = document.querySelector('#happy')
const starterMeme = document.querySelector('.meme')
const starterDelete = document.querySelector('.delete-meme')

let totalMemes = localStorage.length + 1;

memeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // ***********   Get Mood    ***************
    let selectedMood;
    for (let mood of moods) {
        if (mood.checked === true) {
            selectedMood = mood.value;
        }
    }

    //  **********   CREATE MEME AND SAVE    ********************
    if (imageUrl.value && topTextInput.value && botTextInput.value) {
        const newMeme = createMeme(imageUrl.value, topTextInput.value, botTextInput.value, selectedMood)
        memeSection.appendChild(newMeme)
        const saveMeme = {
            id: `meme${totalMemes}`,
            url: imageUrl.value,
            topText: topTextInput.value,
            botText: botTextInput.value,
            mood: selectedMood,
        }
        localStorage.setItem(`meme${totalMemes}`, JSON.stringify(saveMeme))
        totalMemes += 1;
        imageUrl.value = '';
        topTextInput.value = '';
        botTextInput.value = '';
    } else {
        alert(
            `  
                Please complete the enitre form...
             
                       ...to generate your Moodmeem.`);
    }
})
//   *************  Load Starter Meme  ******************
starterMeme.addEventListener('mouseenter', () => {
    happySound.play()
})
starterMeme.addEventListener('mouseleave', () => {
    happySound.pause()
})
starterDelete.addEventListener('click', () => {
    let check = confirm("Are you sure you want to delete this Moodmeem?")
    if (check === true) {
        starterMeme.remove()
    }
})

//   ***********   Create Meme Function   ***************

let createMeme = (image, textTop, textBottom, mood) => {

    let createAudio = (mood) => {
        let audio = document.createElement('audio')
        audio.setAttribute('id', `${mood}`)
        let source = document.createElement('source')
        source.setAttribute('src', `../audio/${mood}.mp3`)
        source.setAttribute('type', 'audio/mp3')
        audio.appendChild(source)
        return audio
    }

    let meme = document.createElement('div')
    meme.setAttribute('class', 'meme')
    meme.setAttribute('data-mood', mood)

    let img = document.createElement('img')
    img.setAttribute('class', 'meme-image')
    img.setAttribute('src', image)

    let topTxt = document.createElement('span')
    topTxt.setAttribute('class', 'meme-text-top')
    topTxt.innerText = textTop

    let botTxt = document.createElement('span')
    botTxt.setAttribute('class', 'meme-text-bottom')
    botTxt.innerText = textBottom

    let del = document.createElement('span')
    del.setAttribute('class', 'delete-meme')
    del.innerText = 'X'

    let newAudio = createAudio(mood)

    meme.append(topTxt, img, botTxt, del, newAudio)

    meme.addEventListener('mouseenter', () => {
        newAudio.play()
    })
    meme.addEventListener('mouseleave', () => {
        newAudio.pause()
    })
    del.addEventListener('click', (e) => {
        let check = confirm("Are you sure you want to delete this Moodmeem?")
        if (check === true) {
            meme.remove()
            localStorage.removeItem(`meme${totalMemes - 1}`)
        }
    })
    return meme;
}

if (localStorage.length > 0) {
    for (let i = 1; i <= localStorage.length; i++) {
        const getMemes = localStorage.getItem(`meme${i}`);
        let savedMemes = JSON.parse(getMemes)
        let saved = createMeme(savedMemes.url, savedMemes.topText, savedMemes.botText, savedMemes.mood);
        memeSection.appendChild(saved)
    }
}

