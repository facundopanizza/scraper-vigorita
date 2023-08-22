export const genImageHtmlFile = (
  productInfo: { title: string; value: string }[][]
): string => {
  return `
  <div style="display: flex; column-gap: 1px; flex-wrap: wrap; justify-content: center;">
  ${productInfo.map(
    (item, i) =>
      `
    <div>
  <img
    class="openModal"
    src="images/${i + 1}.jpg"
    width="250px"
    style="cursor: pointer"
  />
</div>

<div
  id="modal"
  style="
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: none;
  "
>
  <div
    id="modalDialog"
    style="
      position: fixed;
      z-index: 999999;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 500px;
      background-color: white;
      border-radius: 15px;
      max-height: 100%;
      overflow-y: auto;
    "
  >
    <div style="display: flex; justify-content: center; position: relative">
      <div
        class="button-close-modal"
        style="
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 10px;
          width: 24px;
          height: 24px;
          background-color: white;
          color: black;
          opacity: 0.5;
          border-radius: 100%;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div style="width: 100%">
        <img
          src="#"
          id="imageOfModal"
          style="
            width: 100%;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
          "
        />
      </div>
    </div>


    <div style="padding: 3px 6px">
      <h3 style="font-size: 16px; font-weight: 500">FICHA TÉCNICA</h3>

      ${item
        .map(
          (info) => `
      <div
        style="
          display: flex;
          font-size: 14px;
          font-weight: 400;
          border-bottom: 1px solid rgb(236, 236, 236);
          justify-content: space-between;
        "
      >
        <div style="color: rgb(119, 119, 119); font-weight: 600">${info.title}</div>
        <div>${info.value}</div>
      </div>
`
        )
        .join('')}
    </div>
  </div>
</div>
  `
  ).join('')}
</div> 
  `;
};
