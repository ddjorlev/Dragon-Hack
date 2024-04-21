var $progressValue = 0;
var resultList = [];
var ListOfanswers1 = [];

ListOfanswers1.push(-2);

const quizdata=[
  {
    question:"Which animal best represents you?",
    options:["Social butterfly", "Party animal", "Chameleon", "Wise owl","Lone wolf"],
    answer:"Shrewd",
    category:1
  },
  {
    question:"When are you free?",
    options:["In the morning", "At noon", "After lunch", "Around dinner","Tonight"],
    answer:"Shrewd",
    category:1
  },
  {
    question:"Where do you prefer to dine?",
    options:["Enjoy home cooked meals", "Try out a new restaurant", "Dine at cozy cafe", "Have a picnic or a barbeque"],
    answer:"Disown",
    category:2
  },
  {
    question:"How do you destress after a long day?",
    options:["Exercise or play some sport", "Go out with friends", "Play video games", "Take a hot bath and relax"],
    answer:"Incompetent",
    category:3
  },
  {
    question:"How much are you willing to spend?",
    options:["As little as possible", "I'm on a budget", "I'm OK with reasonable price", "I'm fine with spending", "Price is not a factor for me"],
    answer:"Chameleon",
    category:1
  },
  {
    question:"When it comes to entertainment what do you prefer?",
    options:["Puzzles or strategy games", "Card games", "Video games", "TV shows / Film" , "Reality Shows"],
    answer:"Titular",
    category:2
  }
    /*
    {
      question:"To deliver an elaborate or formal public speech.",
      options:["Orate", "Magician", "Access", "Guzzle"],
      answer:"Orate",
      category:2
    },
    {
      question:"A wharf or artificial landing-place on the shore of a harbor or projecting into it",
      options:["Intolerable", "Quay", "Fez", "Insatiable"],
      answer:"Quay",
      category:3
    },
    {
      question:"Friendly counsel given by way of warning and implying caution or reproof",
      options:["Credence", "Colloquy", "Abyss", "Monition"],
      answer:"Monition",
      category:1
    },
    {
      question:"To make a beginning in some occupation or scheme",
      options:["Muster", "Embark", "Ocular", "Apprehensible"],
      answer:"Ocular",
      category:2
    },
    {
      question:"Able to reinforce sound by sympathetic vibrations",
      options:["Resonance", "Clandestine", "Diffusion", "Quietus"],
      answer:"Resonance",
      category:3
    },
    {
      question:"To send off or consign, as to an obscure position or remote destination",
      options:["Monolith", "Endurable", "Efficient", "Relegate"],
      answer:"Relegate",
      category:1
    }*/
];
/** Random shuffle questions **/
function shuffleArray(question){
   var shuffled=question.sort(function() {
    return .5 - Math.random();
 });
   return shuffled;
}

function shuffle(a) {
  for (var i = a.length; i; i--) {
    var j = Math.floor(Math.random() * i);
    var _ref = [a[j], a[i - 1]];
    a[i - 1] = _ref[0];
    a[j] = _ref[1];
  }
}

/*** Return shuffled question ***/
function generateQuestions(){
  var questions=shuffleArray(quizdata);    
  return questions;
}

/*** Return list of options ***/
function returnOptionList(opts, i){

  var optionHtml='<li class="myoptions">'+
    '<input value="'+opts+'" name="optRdBtn" type="radio" id="rd_'+i+'">'+
    '<label for="rd_'+i+'">'+opts+'</label>'+
    '<div class="bullet">'+
      '<div class="line zero"></div>'+
      '<div class="line one"></div>'+
      '<div class="line two"></div>'+
      '<div class="line three"></div>'+
      '<div class="line four"></div>'+
      '<div class="line five"></div>'+
      '<div class="line six"></div>'+
      '<div class="line seven"></div>'+
    '</div>'+
  '</li>';

  return optionHtml;
}

/** Render Options **/
function renderOptions(optionList){
  var ulContainer=$('<ul>').attr('id','optionList');
  for (var i = 0, len = optionList.length; i < len; i++) {
    var optionContainer=returnOptionList(optionList[i], i)
    ulContainer.append(optionContainer);
  }
  $(".answerOptions").html('').append(ulContainer);
}

/** Render question **/
function renderQuestion(question){
  $(".question").html("<h1>"+question+"</h1>");
}

/** Render quiz :: Question and option **/
function renderQuiz(questions, index){ 
  var currentQuest=questions[index];  
  renderQuestion(currentQuest.question); 
  renderOptions(currentQuest.options); 
  console.log("Question");
  console.log(questions[index]);
}

/** Return correct answer of a question ***/
function getCorrectAnswer(questions, index){
  return questions[index].answer;
}

/** pushanswers in array **/
function correctAnswerArray(resultByCat){
  var arrayForChart=[];
  for(var i=0; i<resultByCat.length;i++){
    arrayForChart.push(resultByCat[i].correctanswer);
  }
  return arrayForChart;
}
/** Generate array for percentage calculation **/
function genResultArray(results, wrong){
  var resultByCat = resultByCategory(results);
  var arrayForChart=correctAnswerArray(resultByCat);
  arrayForChart.push(wrong);
  return arrayForChart
}

/** percentage Calculation **/
function percentCalculation(array, total){
  var percent = array.map(function (d, i) {
    return (100 * d / total).toFixed(2);
  });
  return percent;
}

/*** Get percentage for chart **/
function getPercentage(resultByCat, wrong){
  var totalNumber=resultList.length;
  var wrongAnwer=wrong;
}

/** count right and wrong answer number **/
function countAnswers(results){

  var countCorrect=0, countWrong=0;

  for(var i=0;i<results.length;i++){
    if(results[i].iscorrect==true)  
        countCorrect++;
    else countWrong++;
  }

  return [countCorrect, countWrong];
}

/**** Categorize result *****/
function resultByCategory(results){

  var categoryCount = [];
  var ctArray=results.reduce(function (res, value) {
    if (!res[value.category]) {
        res[value.category] = {
            category: value.category,
            correctanswer: 0           
        };
        categoryCount.push(res[value.category])
    }
    var val=(value.iscorrect==true)?1:0;
    res[value.category].correctanswer += val; 
    return res;
  }, {});

  categoryCount.sort(function(a,b) {
    return a.category - b.category;
  });

  return categoryCount;
}


/** Total score pie chart**/
function totalPieChart(_upto, _cir_progress_id, _correct, _incorrect) {
  console.log("REZULTAT:");
  console.log(ListOfanswers1);

  fetch('http://localhost:8080', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(ListOfanswers1),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Response from server:', data);

      fetch('http://localhost:8080/get_best_event')
      .then(response => response.text())
      .then(return_event => {
          console.log('Return event from server:', return_event);
          var v = document.getElementById("result");
          v.innerHTML = return_event;

          var listica = ["Julija"]
          var cinema = ["FANT IN CAPLJA (Kinodvor, 21.4.)"]

          var div = document.getElementById("DIV");
          var img = document.createElement("img");
          img.style.height = "500px";  // Set height to 100 pixels
          img.style.width = "500px";   // Set width to 150 pixels
          img.style.border = "3px solid black";

          if(listica.includes(return_event)){
            
            img.src = "Pictures/julija.jpg";
            div.appendChild(img);
          }
          else if(cinema.includes(return_event)){
            img.src = "Pictures/cinema.jpg";
            div.appendChild(img);
          }





      })
      .catch(error => {
          console.error('Error fetching return event:', error);
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function renderBriefChart(correct, total, incorrect){
  var percent=(100 * correct / total);
  if(Math.round(percent) !== percent) {
      percent = percent.toFixed(2);
  }

  totalPieChart(percent, '_cir_progress', correct, incorrect)
}

/*** render chart for result **/
function renderChart(data){
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: [ "Verbal communication", 
              "Non-verbal communication", 
              "Written communication", 
              "Incorrect"
            ],
    datasets: [
                {
                 
                  data: data,
                  backgroundColor: [  '#e6ded4',
                                      '#968089',
                                      '#e3c3d4',
                                      '#ab4e6b'
                                    ],
                  borderColor: [  'rgba(239, 239, 81, 1)',
                                  '#8e3407',
                                  'rgba((239, 239, 81, 1)',
                                  '#000000'
                                ],
                  borderWidth: 1
                }
              ]
    },
    options: {
         pieceLabel: {
          render: 'percentage',
          fontColor: 'black',
          precision: 2
        }
      }
    
  });
}

/** List question and your answer and correct answer  

*****/
function getAllAnswer(results){
    var innerhtml="";
    for(var i=0;i<results.length;i++){

      var _class=((results[i].iscorrect)?"item-correct":"item-incorrect");
       var _classH=((results[i].iscorrect)?"h-correct":"h-incorrect");
      

      var _html='<div class="_resultboard '+_class+'">'+
                  '<div class="_header">'+results[i].question+'</div>'+
                  '<div class="_yourans '+_classH+'">'+results[i].clicked+'</div>';

        var html="";
       if(!results[i].iscorrect)
        html='<div class="_correct">'+results[i].answer+'</div>';
       _html=(_html+html)+'</div>';
       innerhtml+=_html;
    }

  $(".allAnswerBox").html('').append(innerhtml);
}
/** render  Brief Result **/
function renderResult(resultList){ 
  
  var results=resultList;
  console.log(results);
  var countCorrect=countAnswers(results)[0], 
  countWrong=countAnswers(results)[1];
  
  renderBriefChart(countCorrect, resultList.length, countWrong);
}

function renderChartResult(){
  var results=resultList; 
  var countCorrect=countAnswers(results)[0], 
  countWrong=countAnswers(results)[1];
  var dataForChart=genResultArray(resultList, countWrong);
  renderChart(dataForChart);
}

/** Insert progress bar in html **/
function getProgressindicator(length){
  var progressbarhtml=" ";
  for(var i = 0; i < length; i++){
    progressbarhtml+='<div class="my-progress-indicator progress_'+(i+1)+' '+((i==0)?"active":"")+'"></div>';
  }
  $(progressbarhtml).insertAfter(".my-progress-bar");
} 

/*** change progress bar when next button is clicked ***/
function changeProgressValue(){
  $progressValue+= 16;
  if ($progressValue >= 100) {
    
  } else {
    if($progressValue==99) $progressValue=100;
    $('.my-progress')
      .find('.my-progress-indicator.active')
      .next('.my-progress-indicator')
      .addClass('active');      
    $('progress').val($progressValue);
  }
  $('.js-my-progress-completion').html($('progress').val() + '% complete');

} 

function addClickedAnswerToResult(questions,presentIndex,clicked ){
  var correct=getCorrectAnswer(questions, presentIndex);
    var result={
      index:presentIndex,
      question:questions[presentIndex].question, 
      clicked:clicked,
      iscorrect:(clicked==correct)?true:false,
      answer:correct, 
      category:questions[presentIndex].category
    }
    resultList.push(result);

    var answer1 = (questions[presentIndex].options).indexOf(result.clicked);
    console.log(answer1);
    ListOfanswers1.push(answer1);

    console.log("result");
    console.log(result);
      
}

$(document).ready(function() {
  
  var presentIndex=0;
   var clicked=0;

  var questions=generateQuestions();
  renderQuiz(questions, presentIndex);
  getProgressindicator(questions.length);

  $(".answerOptions ").on('click','.myoptions>input', function(e){
    clicked=$(this).val();   

    if(questions.length==(presentIndex+1)){
      $("#submit").removeClass('hidden');
      $("#next").addClass("hidden");
    }
    else{

      $("#next").removeClass("hidden");
    }
  
  });

  $("#next").on('click',function(e){
    e.preventDefault();
    addClickedAnswerToResult(questions,presentIndex,clicked);

    $(this).addClass("hidden");
    
    presentIndex++;
    renderQuiz(questions, presentIndex);
    changeProgressValue();
  });

  $("#submit").on('click',function(e){
     addClickedAnswerToResult(questions,presentIndex,clicked);
    $('.multipleChoiceQues').hide();
    $(".resultArea").show();
    renderResult(resultList);

  });

   $(".resultArea").on('click','.viewchart',function(){
      $(".resultPage2").show();
       $(".resultPage1").hide();
       $(".resultPage3").hide();
       renderChartResult();
   });

    $(".resultArea").on('click','.backBtn',function(){
      $(".resultPage1").show();
       $(".resultPage2").hide();
       $(".resultPage3").hide();
        renderResult(resultList);
   });

    $(".resultArea").on('click','.viewanswer',function(){
      /*$(".resultPage3").show();
       $(".resultPage2").hide();
       $(".resultPage1").hide();
        getAllAnswer(resultList);*/
        window.location.href = "Lapsitopsi.html";
   });

  $(".resultArea").on('click','.replay',function(){
    window.location.reload(true);
  });

});