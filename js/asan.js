(function ($) {
  // function newContent(newUrl) {
  //   $("#container > #content").remove();
  //   $("#container").load(newUrl + " #content");
  // }

  // 로고를 클릭하면 main.html의 #content를 load() 하시오.
  $("body").on("click","#header h1 a, #footer .quickMenu a, .mainContent #step_area a, .contTit .prev a", function () {
      var url = this.href;
      $("#container > #content").remove();
      $("#container").load(url + " #content");
      return false;
    }
  );

  // $('#footer .quickMenu a')를 클릭하면 해당 html의 #content를 load()하시오.
  // $("#footer .quickMenu a").on("click", function () {
  //   var url = this.href;
  //   newContent(url);
  //   return false;
  // });


  var usedata 
  $.ajax({
    type: 'GET',
    url: 'data/doctors.json',
    // beforesend: 혹시나 json파일이 아니라면 바꿔주는것
    beforeSend: function(xhr) {
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType('application/json')
      }
    },
    success: function(data) {
      usedata = data
    },
    error: function() {
      alert(xhr.status + '오류발생')
    }
  })

  $('#container').on('click', '.medicalContent .mediList a', function(e){
    e.preventDefault()
    var url = this.href;
    var part = this.id
    $("#container > #content").remove();
    $("#container").load(url + " #content", function() {
      var newContent = ''
      for (var i in usedata[part]) {
        newContent += `<li><div class="img"><img src="${usedata[part][i].photo}" alt=""></div>`
        newContent += `<div class="doctorInfo"><strong>${usedata[part][i].name}</strong>`
        newContent += `<p>${usedata[part][i].depart}</p>`
        newContent += `<div>${usedata[part][i].about}</div></div></li>`
      }
      $('#content .part1DoctorList').html(`<ul>${newContent}</ul>`)
    });


  })


  /* 햄버거 버튼 클릭시 네비박스 열기 */
  $('#lnb_menu').on('click', function() {
    $(this).next().css({
      display: 'block'
    })
    $('#lnb').animate({
      left: '0px'
    }, 500)
  })

  $('#lnb_close').on('click', function() {
    $('#lnb').animate({
      left: '-274px'
    }, 500, function() {
      $('#navWrap').css({
        display: 'none'
      })
    })
  })


  /* 스크롤이벤트 */
  // $(window).scroll(function() {
  //   var sct = $(this).scrollTop()
  //   if (sct >= 50 && !$('#header').hasClass('on')) {
  //     $('#header').slideUp(100).slideDown(100).addClass('on')
  //   } else if ( sct < 50 && $('#header').hasClass('on')) {
  //     $('#header').removeClass('on')
  //   }
  // })



})(jQuery);
