function getPilihanKomputer() {
    const comp = Math.floor(Math.random() * 3) + 1;
    if (comp === 1) return 'gajah';
    if (comp === 2) return 'orang';
    return 'semut';
}

function getHasil(comp, p) {
    if (p === comp) return 'Seri';
    if (p === 'gajah') return comp === 'semut' ? 'Kalah' : 'Menang';
    if (p === 'orang') return comp === 'gajah' ? 'Kalah' : 'Menang';
    return comp === 'orang' ? 'Kalah' : 'Menang';
}

function putar(callback) {
    const imgComputer = document.querySelector('.img-komputer');
    const gambar = ['gajah', 'orang', 'semut'];
    let i = 0;
    const waktuMulai = new Date().getTime();
    const interval = setInterval(function () {
        if (new Date().getTime() - waktuMulai > 500) {
            clearInterval(interval);
            callback();
            return;
        }
        imgComputer.setAttribute('src', gambar[i] + '.png');
        i = (i + 1) % gambar.length;
    }, 100);
}

function main() {
    const pilihan = document.querySelectorAll('li img');
    const skorPlayer = document.querySelector('.skor-player');
    const skorKomputer = document.querySelector('.skor-komputer');
    let nilaiSkorPemain = 0;
    let nilaiSkorKomputer = 0;

    pilihan.forEach(function (pil) {
        pil.addEventListener('click', function () {
            const pilihanKomputer = getPilihanKomputer();
            const pilihanPlayer = pil.className;
            const hasil = getHasil(pilihanKomputer, pilihanPlayer);

            putar(function () {
                const imgComputer = document.querySelector('.img-komputer');
                imgComputer.setAttribute('src', pilihanKomputer + '.png');

                if (hasil === 'Menang') {
                    nilaiSkorPemain++;
                    skorPlayer.textContent = nilaiSkorPemain;
                } else if (hasil === 'Kalah') {
                    nilaiSkorKomputer++;
                    skorKomputer.textContent = nilaiSkorKomputer;
                }

                const tampilHasil = document.querySelector('.info');
                tampilHasil.innerHTML = hasil;

                if (nilaiSkorKomputer === 5 || nilaiSkorPemain === 5) {
                    resetGame();
                }
            });
        });
    });

    function resetGame() {
        const tampilHasil = document.querySelector('.info');
        tampilHasil.innerHTML = '';

        if (nilaiSkorPemain === 5) {
            skorPlayer.textContent = nilaiSkorPemain;
            setTimeout(function () {
                alert('Selamat kamu menang!');
                mulaiPermainanBaru();
            }, 100);
        } else if (nilaiSkorKomputer === 5) {
            skorKomputer.textContent = nilaiSkorKomputer;
            setTimeout(function () {
                alert('Yahhh kamu kalah :V');
                mulaiPermainanBaru();
            }, 100);
        } else {
            mulaiPermainanBaru();
        }
    }

    function mulaiPermainanBaru() {
        const playAgain = confirm('Main lagi?');
        if (playAgain) {
            nilaiSkorPemain = 0;
            nilaiSkorKomputer = 0;
            skorPlayer.textContent = nilaiSkorPemain;
            skorKomputer.textContent = nilaiSkorKomputer;
            main();
        } else {
            alert('Terima kasih sudah bermain!');
        }
    }

    skorPlayer.textContent = nilaiSkorPemain;
    skorKomputer.textContent = nilaiSkorKomputer;
}

main();
