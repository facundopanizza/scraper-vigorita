export const genImageHtmlFile = (numberOfImages: number) => {
  const images: string[] = [];

  for (let i = 0; i < numberOfImages; i++) {
    images.push(`
  <div class="vc_grid-item vc_clearfix vc_col-sm-3">
    <div class="vc_grid-item-mini vc_clearfix">
      <div class="vc_gitem-animated-block">
        <div
          class="vc_gitem-zone vc_gitem-zone-a vc-gitem-zone-height-mode-auto vc-gitem-zone-height-mode-auto-1-1 vc_gitem-is-link"
          style="
            background-image: url('images/${i + 1}.jpg') !important;
          "
        >
          <a
            href="images/${i + 1}.jpg"
            title="1"
            data-rel="prettyPhoto[rel--842915379]"
            data-vc-gitem-zone="prettyphotoLink"
            class="vc_gitem-link prettyphoto vc-zone-link vc-prettyphoto-link"
          ></a>
          <img
            src="images/${i + 1}.jpg"
            class="vc_gitem-zone-img"
            alt=""
          />
          <div class="vc_gitem-zone-mini"></div>
        </div>
      </div>
    </div>
    <div class="vc_clearfix"></div>
  </div>
  `);
  }

  return `
  <style type="text/css">
img.wp-smiley,
img.emoji {
  display: inline !important;
  border: none !important;
  box-shadow: none !important;
  height: 1em !important;
  width: 1em !important;
  margin: 0 0.07em !important;
  vertical-align: -0.1em !important;
  background: none !important;
  padding: 0 !important;
}
</style>
<link
rel="stylesheet"
id="dashicons-css"
href="/wp-includes/css/dashicons.min.css?ver=5.7.4"
media="all"
/>
<link
rel="stylesheet"
id="wp-jquery-ui-dialog-css"
href="/wp-includes/css/jquery-ui-dialog.min.css?ver=5.7.4"
media="all"
/>
<link
rel="stylesheet"
id="thickbox-css"
href="/wp-includes/js/thickbox/thickbox.css?ver=5.7.4"
media="all"
/>
<div
class="vc_grid vc_row vc_grid-gutter-1px vc_pageable-wrapper vc_hook_hover"
data-vc-pageable-content="true"
>
<div
  class="vc_pageable-slide-wrapper vc_clearfix"
  data-vc-grid-content="true"
>
${images.join('')}
</div>
</div>
  `;
};
