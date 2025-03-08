// Initialize confetti
import JSConfetti from "js-confetti";

// Define interfaces
interface IAddConfettiConfig {
    confettiRadius?: number,
    confettiNumber?: number,
    confettiColors?: string[],
    emojis?: string[],
    emojiSize?: number,    
}

class Confetti {
    maxConfettiInstances = 3;
    confetti: JSConfetti;
    confettiInstances = 0;
    scrollTimeout: any = null;

    constructor(maxConfettiInstances: number = 3) {
        this.maxConfettiInstances = maxConfettiInstances;
        this.confetti = new JSConfetti();

        // set up scroll handling
        window.onscroll = () => {
            // Add class to body while scrolling
            document.body.classList.add("scrolling");
            if(this.scrollTimeout) clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                document.body.classList.remove("scrolling");
            }, 250);
        };
    }

    addConfetti(options: IAddConfettiConfig) {
        return new Promise((resolve, reject) => {
            if (document.body.classList.contains("scrolling")) {
                reject("Scrolling");
                return;
            }

            if (this.confettiInstances >= this.maxConfettiInstances) {
                reject("Max confetti instances reached");
                return;
            }

            this.confettiInstances++;
            this.confetti.addConfetti({
                emojis: ['🎉', '🎊', '🎈', '🏆', '🏅'],
                confettiNumber: 10,
            });

            resolve(this.confetti.addConfetti(options).then(() => this.confettiInstances--));
        });
    }
}

export type { IAddConfettiConfig };
export default Confetti;