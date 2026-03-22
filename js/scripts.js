$(function () {
  initializePeopleSlider($(".people-slider"));

  $(".blockList .title").on("click", function () {
    if ($(window).width() > 1200) {
      return;
    }

    $(this).next(".linksList").slideToggle(300);
    $(this).toggleClass("expanded");
  });

  $("button.menuListBtn").on("click", function (e) {
    e.stopPropagation();

    var $menuListItem = $(this).closest(".menuList__item");
    var $tabContent = $menuListItem.find(".tabContent");

    if ($tabContent.hasClass("hide")) {
      $(this).closest(".menuList").find(".tabContent").addClass("hide");
      $tabContent.removeClass("hide");
    } else {
      $tabContent.addClass("hide");
    }

    if ($(window).width() < 1200) {
      $(".goToGlz").addClass("hideGoToGlz");
      $(".prevBtnMenu").addClass("showPrevBtn");
    }
  });

  $(".subMenuListBtn").on("click", function (e) {
    e.stopPropagation();

    var $this = $(this);
    var $subMenuList = $this.closest(".subMenuList");
    var $subMenuListItem = $this.closest(".subMenuList__item");
    var $categoryItemList = $subMenuListItem.find(".categoryItemList");

    if ($(window).width() > 1200) {
      $subMenuList.find(".categoryItemList").removeClass("showElementDesktop");
      $subMenuList.find(".subMenuListBtn").removeClass("active");

      $categoryItemList.addClass("showElementDesktop");
      $this.addClass("active");
    } else {
      $subMenuList
        .find(".categoryItemList")
        .not($categoryItemList)
        .slideUp(300)
        .removeClass("showElementMobile");
      $subMenuList.find(".subMenuListBtn").not($this).removeClass("active");

      $categoryItemList.stop(true, true).slideToggle(400, function () {
        $(this).toggleClass("showElementMobile");
      });

      $this.toggleClass("active");
    }
  });

  $(".prevBtnMenu").on("click", function () {
    if ($(window).width() >= 1200) {
      return;
    }

    $(".goToGlz").removeClass("hideGoToGlz");
    $(".prevBtnMenu").removeClass("showPrevBtn");
  });

  $(".btnHamburger").on("click", function (e) {
    e.stopPropagation();

    $(this).addClass("open");
    $(this).closest(".header").find(".headerMenu").addClass("open");
    $("body").css("overflow", "hidden");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".menuList").length) {
      $(".tabContent").addClass("hide");
    }

    if (!$(e.target).closest(".innerHeader, .btnHamburger").length) {
      $(".btnHamburger").removeClass("open");
      $(".headerMenu").removeClass("open");
      $("body").css("overflow", "");
    }
  });

  $(".tabContent .formSearch .searchSubmit").on("click", function () {
    search(true);
  });

  $(document).on("click", ".tabContent .subMenu .btnFilter", function (e) {
    e.preventDefault();

    $(this).closest(".subMenu").find("li").removeClass("active");

    var facet = {
      key: $(this).attr("data-key") || "",
      text: $(this).attr("data-text") || "",
      keyRaw: $(this).attr("data-keyraw") || "",
      count: $(this).attr("data-count") || 0,
    };

    search(false, facet);
  });

  $(document).on("click", ".tabContent .facetTag a", function (e) {
    e.preventDefault();

    var facet = {
      key: $(this).attr("data-key") || "",
      text: $(this).attr("data-text") || "",
      keyRaw: $(this).attr("data-keyraw") || "",
      count: $(this).attr("data-count") || 0,
    };

    search(false, facet);
  });
});

function search(newSearch, facet = {}) {
  facetSearch = false;

  if (newSearch) {
    facets = "";
  } else {
    facets = facet;
    facetSearch = true;
  }

  var searchTerm = $(".formSearch").find(".mainSearch").val();

  if (searchTerm !== undefined && searchTerm.trim().length > 2) {
    $.ajax({
      type: "POST",
      url: "/umbraco/surface/SevenOctoberSongsSearchSurface/PostSearch",
      data: {
        siteId: $(".formSearch").find("#siteId").val(),
        query: searchTerm,
        page: 0,
        facets: [facets],
        facetSearch: facetSearch,
      },
      success: function (res) {
        if (facetSearch) {
          $(".search-container .search-results").html(res);
        } else {
          $(".search-container .bottomGrid.search").html(res);
        }
      },
      error: function (err) {
        console.error("Search request failed", err);
      },
    });
  }
}

function initializePeopleSlider($slider) {
  $slider.slick({
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: $("body").attr("dir") === "rtl",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    appendDots: $("#dots-container-" + $slider.data("slider-id")),
    prevArrow: $slider.closest(".people-slider-component").find(".prev-btn"),
    nextArrow: $slider.closest(".people-slider-component").find(".next-btn"),
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          dots: true,
          arrows: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "80px",
        },
      },
    ],
  });
}
