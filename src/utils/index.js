/**각 스크롤 섹션의 높이 세팅함수 */
export const setLayout = (sceneInfo) => {
  sceneInfo.forEach((info, i) => {
    //높이를 만들고
    info.scrollHeight = info.heightNum * window.innerHeight;
    //각 스크롤 섹션의 높이 세팅
    info.objs.container.style.height = `${info.scrollHeight}px`;
  });
};
