/**각 스크롤 섹션의 높이 세팅함수 */
export const setLayout = (sceneInfos, currSecIdxRef) => {
  sceneInfos.forEach((info, i) => {
    //높이를 만들고
    info.scrollHeight = info.heightNum * window.innerHeight;
    //각 스크롤 섹션의 높이 세팅
    info.objs.container.style.height = `${info.scrollHeight}px`;
    //개발용 border보기
    info.objs.container.style.border = "2px solid red";
  });

  //setLayout함수 안 최상단에서 선언 및 초기화하면 항상 0이다. => 아직 height가 0이기 때문이다. 초기화 위치에 주의하자
  let yOffset = window.scrollY;

  /** 스크롤이 페이지의 시작점이 아닌 중간어딘가에서 새로고침이 발생했을 때 스크롤이 위치한 section의 index값으로 바꿔준다 */
  let totalScrollHeight = 0;
  for (let i = 0; i < sceneInfos.length; i++) {
    totalScrollHeight += sceneInfos[i].scrollHeight;

    if (totalScrollHeight >= yOffset) {
      currSecIdxRef.current = i;
      break;
    }
  }

  /**각 section에 존재하는 sticky msg들의 display를 srcoll이 해당 section에 있을 때 block으로 해준다. */
  if (sceneInfos[currSecIdxRef.current].objs.sticky_msgs) {
    sceneInfos[currSecIdxRef.current].objs.sticky_msgs.forEach((elem, i) => {
      elem.style.display = "block";
    });
  }
};

/**애니메이션이 작동되는 범위를 구하는 함수 */
const calcValues = (values, currSecYOffset, currSecInfo) => {
  /**현재 section에서 스크롤된 비율 */
  let scrollRatio = currSecYOffset / currSecInfo.scrollHeight;
  /**어떤 범위에서 스크롤이 움직여야 할지 모르므로 범위의 끝값 - 시작값으로 범위를 구하고 거기에 scrollRatio를 곱한 뒤 시작값을 더한다 */
  let rv = scrollRatio * (values[1] - values[0]) + values[0];
  return rv;
};

/**애니메이션 작동시키는 함수 */
const playAnimation = (currSecIdxRef, sceneInfos, prevScrollHeightRef) => {
  const { current } = currSecIdxRef;
  /**현재 section의 info object */
  const currSecInfo = sceneInfos[current];
  /**현재 section의 values */
  const values = currSecInfo.values;
  /**현재 section에서의 window.scrollY */
  const currSecYOffset = window.scrollY - (prevScrollHeightRef + 96);

  switch (currSecIdxRef.current) {
    case 0: // 첫번째 section에 있을 때
      let fstMsg_opacity_in = calcValues(
        values.msg_opacity_in_arr[0],
        currSecYOffset,
        currSecInfo
      );

      currSecInfo.objs.sticky_msgs[0].style.opacity = fstMsg_opacity_in;
      break;
    case 1: // 두번째 section에 있을 때
      break;
    case 2: // 세번째 section에 있을 때
      break;
    case 3: // 네번째 section에 있을 때
      break;
  }
};

/**scroll event시 작동하는 메인함수 */
export const scrollLoop = (
  sceneInfos,
  prevScrollHeightRef,
  setCurrSecIdx,
  currSecIdxRef
) => {
  let yOffset = window.scrollY;

  /**section이 바뀔 때마다 opacity값이 찰나에 음수로 되는 것을 방지하기 위한 변수 */
  let isEnterNewSection = false;

  let { current } = prevScrollHeightRef;

  current = 0; //prevScrollHeight에 계속 누적을 방지하기 위해서

  /**section이 변경될 때 현재 section이전의 모든 section들의 height를 누적 */
  for (let i = 0; i < currSecIdxRef.current; i++) {
    current += sceneInfos[i].scrollHeight;
  }

  /**현재 스크롤한 길이가 이전 section들의 높이 + 현재 section 높이 + GNB높이(96) 보다 크면  */
  if (
    yOffset >
    current +
      sceneInfos[currSecIdxRef.current].scrollHeight +
      96 /**(GNB높이 )*/
  ) {
    isEnterNewSection = true;
    currSecIdxRef.current++;
    setCurrSecIdx((prev) => prev + 1);
  }

  /**현재 스크롤한 길이가 이전 section들의 높이 보다 작아지면   */
  if (yOffset < current + 96) {
    // 브라우저 바운스 효과로 인해 마이너가 되는 것을 방지(모바일 같은 경우)
    if (currSecIdxRef.current === 0) return;
    isEnterNewSection = true;
    currSecIdxRef.current--;
    setCurrSecIdx((prev) => prev - 1);
  }
  if (isEnterNewSection) return;
  playAnimation(currSecIdxRef, sceneInfos, current);
};

/**현재 viewport에 있는 section을 제외한 나머지 section의 sticky msg들을 전부 display none처리해서 render tree에서 제거 */
export const getRemoveOnRenderTree = (stickyMsgArrs, currSecIdxRef) => {
  stickyMsgArrs.forEach((arr, i) => {
    if (currSecIdxRef.current === i && arr) {
      arr.current.forEach((msg, i) => (msg.style.display = "block"));
    } else if (currSecIdxRef.current !== i && arr) {
      arr.current.forEach((msg, i) => (msg.style.display = "none"));
    }
  });
};
