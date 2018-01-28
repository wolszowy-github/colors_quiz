
class Quiz  {

    constructor() {

        this.el = {

            slickSliderWrapper: $('.slick-slider'),
            arrows: $('[data-slider-control]'),
            arrowNext: $('[data-slider-control="right"]'),
            arrowPrevious : $('[data-slider-control="left"]'),
            startButton: $('[data-start-button]'),
            resultsButton: $('[data-results]'),
            hairChoiceButtons: $('input[name="hair-choice"]'),
            makeupChoiceButtons: $('input[name="makeup-choice"]'),
            skinChoiceButtons: $('input[name="skin-choice"]'),
            musicChoiceButtons: $('input[name="music-choice"]'),
            hairChoiceValue: 0,
            makeupChoiceValue: 0,
            skinChoiceValue: 0,
            musicChoiceValue: 0,
            testResult: 0
        }
    }

    hairChoice() {
        const that = this;
        this.el.hairChoiceButtons.on('click', function() {

            that.el.hairChoiceValue = that.el.hairChoiceButtons.index($(this)) + 1;
            that.sumPoints();
            console.log(that.el.hairChoiceValue)
            console.log(that.el.testResult)
        })

    }

    makeupChoice() {
        const that = this;
        this.el.makeupChoiceButtons.on('click', function () {

            that.el.makeupChoiceValue = that.el.makeupChoiceButtons.index($(this)) + 1;
            that.sumPoints();
            console.log(that.el.makeupChoiceValue)
            console.log(that.el.testResult)
        })

    }

    skinChoice() {
        const that = this;
        this.el.skinChoiceButtons.on('click', function () {

            that.el.skinChoiceValue = that.el.skinChoiceButtons.index($(this)) + 1;
            that.sumPoints();
            console.log(that.el.skinChoiceValue)
            console.log(that.el.testResult)
        })

    }


    musicChoice() {
        const that = this;
        this.el.musicChoiceButtons.on('click', function () {

            that.el.musicChoiceValue = that.el.musicChoiceButtons.index($(this)) + 1;
            that.sumPoints();
            console.log(that.el.musicChoiceValue)
            console.log(that.el.testResult)

            //last question before the result
            if ($('.slick-active').attr('data-slick-index') == 4 && (that.el.skinChoiceValue && that.el.makeupChoiceValue
                && that.el.hairChoiceValue && that.el.musicChoiceValue)) {

                that.el.arrowNext.fadeIn();
            }
        })

    }

    sumPoints() {
        this.el.testResult = this.el.musicChoiceValue + this.el.skinChoiceValue
        + this.el.makeupChoiceValue + this.el.hairChoiceValue;
    }


    hideArrows() {

        this.el.arrows.hide()

    }

    startQuiz() {
        this.el.startButton.on('click', (e) => {

            e.preventDefault();
            this.el.slickSliderWrapper.slick('slickGoTo', 1);
            this.el.arrowNext.fadeIn();
            
        })
    }


    showAllResults() {
        this.el.resultsButton.on('click', (e) => {

            e.preventDefault();
            $("[class^='app-results-']").fadeIn();
            this.el.resultsButton.hide();
            $('.app-text-bold').hide();
        })
    }


    repeatQuiz() {
        $('[data-repeat-quiz]').on('click', (e) => {

            e.preventDefault();

            //reset quiz
           this.el.hairChoiceValue = 0; 
           this.el.skinChoiceValue = 0;
           this.el.musicChoiceValue = 0;
           this.el.makeupChoiceValue = 0;

           //deselect inputs
            this.el.hairChoiceButtons.prop('checked', false);
            this.el.musicChoiceButtons.prop('checked', false);
            this.el.makeupChoiceButtons.prop('checked', false);
            this.el.skinChoiceButtons.prop('checked', false);
            
            
           this.el.slickSliderWrapper.slick('slickGoTo', 0);          
            $("[class^='app-results-']").hide();
            $('.app-text-bold').show();
            this.el.resultsButton.show();
            $('.app-quiz-wrapper').fadeIn(1000);
            
        })
    }


    sliderProgress() {
        this.el.arrows.on('click', (e) => {

            let activeSlide = $('.slick-active').attr('data-slick-index');

            e.preventDefault();
            if (activeSlide > 0 && activeSlide < 5) {
                this.el.arrows.fadeIn();

                if (activeSlide == 4 && (!this.el.musicChoiceValue || !this.el.skinChoiceValue ||
                    !this.el.makeupChoiceValue || !this.el.hairChoiceValue)) {
                        
                    this.el.arrowNext.fadeOut();
                }

            } else {
                this.el.arrows.fadeOut();
            }

            if (activeSlide == 5) {
                $('.app-quiz-wrapper').hide();

                if (this.el.testResult <= 5){
                    $('.app-results-first').fadeIn();

                } else if (this.el.testResult > 5 && this.el.testResult < 9) {
                    $('.app-results-second').fadeIn();

                } else {
                    const firstTwoQuestSum = this.el.hairChoiceValue + this.el.makeupChoiceValue;

                    if (firstTwoQuestSum > 1 && firstTwoQuestSum < 4) {
                        $('.app-results-first').fadeIn();

                    } else {
                        $('.app-results-third').fadeIn();

                    }
                }
            }
    
        })
    }

    slickSlider() {

        this.el.slickSliderWrapper.slick({
            infinite: false,
            speed: 1000,
            swipe: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: this.el.arrowPrevious,
            nextArrow: this.el.arrowNext
        });
    }

    init() {

        this.slickSlider();
        this.hideArrows();
        this.startQuiz();
        this.sliderProgress();
        this.showAllResults();
        this.repeatQuiz();
        this.hairChoice();
        this.makeupChoice();
        this.skinChoice();
        this.musicChoice();
     }
}


const instance = new Quiz;
instance.init();

