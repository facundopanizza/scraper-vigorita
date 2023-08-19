export const genItemForCategory = (name: string, urlName: string) => {
  return `
  <div class="wpb_column vc_column_container vc_col-sm-1/5">
  <div class="vc_column-inner">
    <div class="wpb_wrapper">
      <div
        class="ult-new-ib ult-ib-effect-style6 sombra ult-ib-resp ult-ib2-min-height"
        data-min-width="768"
        data-max-width="900"
        style="background: #1c5c91; opacity: 0"
        data-opacity="0.5"
        data-hover-opacity="0.1"
        data-min-height="400"
      >
        <img
          class="ult-new-ib-img"
          style="opacity: 0.5"
          alt="null"
          src="/countries-construccion/${urlName}/images/1.jpg"
          data-min-height="400"
        />
        <div
          id="interactive-banner-wrap-3598"
          class="ult-new-ib-desc"
          style=""
        >
          <h1
            class="ult-new-ib-title ult-responsive"
            data-ultimate-target="#interactive-banner-wrap-3598 .ult-new-ib-title"
            data-responsive-json-new='{"font-size":"","line-height":""}'
            style="font-family:&#039;Poppins&#039;;font-weight:900;color:#ffffff;"
          >
            ${name.toUpperCase()}
          </h1>
        </div>
        <a
          class="ult-new-ib-link"
          href="/countries-construccion/${urlName}/"
          title="MADERAS E INSUMOS PARA LA CONSTRUCCION"
        ></a>
      </div>
      <script type="text/javascript">
        (function ($) {
          $(document).ready(function () {
            $('.ult-new-ib').css('opacity', '1');
          });
        })(jQuery);
      </script>
    </div>
  </div>
</div>
  `;
};
