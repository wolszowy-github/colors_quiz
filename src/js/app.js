
class Quiz  {

    constructor() {

        this.el = {

            slickSliderWrapper: $('.slick-slider'),
            arrows: $('[data-slider-control]'),
            arrowNext: $('[data-slider-control="right"]'),
            arrowPrevious : $('[data-slider-control="left"]'),
            startButton: $('[data-start-button]'),
            resultsButton: $('[data-results]'),
            makeupChoiceValue: 0,
            skinChoiceValue: 0,
            musicChoiceValue: 0,
            testResult: 0
        }
    }

    countAnswerPoints(inputsName, answerValue) {
        const that = this;
        $(`input[name=${inputsName}]`).on('click', function() {
            that.el[answerValue] = $(`input[name=${inputsName}]`).index($(this)) + 1;
            that.sumPoints();
            console.log(that.el[answerValue]);
            console.log(that.el.testResult);
            that.unlockResult(that);
        })
    }
    
    unlockResult(that) {
        
        if ($('.slick-active').attr('data-slick-index') == 4 &&
    
            (that.el.skinChoiceValue && that.el.makeupChoiceValue && that.el.hairChoiceValue && that.el.musicChoiceValue)) {
    
            that.el.arrowNext.fadeIn();
        }
    }

    sumPoints() {
        this.el.testResult = this.el.musicChoiceValue + this.el.skinChoiceValue
        + this.el.makeupChoiceValue + this.el.hairChoiceValue;
    }
    
    userChoice() {

        this.countAnswerPoints('hair-choice', 'hairChoiceValue');
        this.countAnswerPoints('makeup-choice', 'makeupChoiceValue');
        this.countAnswerPoints('skin-choice', 'skinChoiceValue');
        this.countAnswerPoints('music-choice', 'musicChoiceValue');

    }


    hideArrows() {

        this.el.arrows.hide()
    }

    startQuiz() {
        this.el.startButton.on('click', (e) => {

            e.preventDefault();
            this.el.slickSliderWrapper.slick('slickGoTo', 1);
            this.el.arrowNext.fadeIn();
            $('.slick-active').find('.app-cloud-wrapper').removeClass('app-slide-out');
            $('.slick-active').find('.app-cloud-wrapper').addClass('app-slide-in');
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
            $('input[name="hair-choice"]').prop('checked', false);
            $('input[name="makeup-choice"]').prop('checked', false);
            $('input[name="music-choice"]').prop('checked', false);
            $('input[name="skin-choice"]').prop('checked', false);
            
            
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
            accessibility: false,
            prevArrow: this.el.arrowPrevious,
            nextArrow: this.el.arrowNext
        });
    }

    addCloudAnimation() {

        this.el.arrows.on('click', function() {

            
            $('.slick-slide').each(function(index, el){
                
                const cloud = $(this).find('.app-cloud-wrapper');
                if (cloud && $(el).hasClass('slick-active')){
                    cloud.addClass('app-slide-in');
                    cloud.removeClass('app-slide-out');
                   
                } else {
                   cloud.removeClass('app-slide-in');
                   cloud.addClass('app-slide-out');
                }
        })
      
            
        })
    }

    init() {

        this.slickSlider();
        this.hideArrows();
        this.startQuiz();
        this.sliderProgress();
        this.showAllResults();
        this.repeatQuiz();
        this.userChoice();
        this.addCloudAnimation();
     }
}


const instance = new Quiz;
instance.init();

