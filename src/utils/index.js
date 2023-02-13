/**canvas에 그려줄 이미지배열 세팅함수 */
const setCanvasImages = (sceneInfos) => {
  let imgElem;
  for (let i = 0; i < sceneInfos[0].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `/videoImage/001/IMG_${6726 + i}.JPG`;
    sceneInfos[0].objs.videoImagesArr.push(imgElem);
  }
  let imgElem2;
  for (let i = 0; i < sceneInfos[2].values.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `/videoImage/002/IMG_${7027 + i}.JPG`;
    sceneInfos[2].objs.videoImagesArr.push(imgElem);
  }
};

/**각 스크롤 섹션의 높이 세팅함수 */
export const setLayout = (sceneInfos, currSecIdxRef) => {
  setCanvasImages(sceneInfos);
  sceneInfos.forEach((info, i) => {
    if (info.type === "sticky") {
      //높이를 만들고
      info.scrollHeight = info.heightNum * window.innerHeight;
    } else if (info.type === "normal") {
      //그냥 자기 높이 주기
      info.scrollHeight = info.objs.container.offsetHeight;
    }
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

  /*화면 높이 별 비율 */
  const heightRatio = window.innerHeight / 1080;
  //화면 크기별로 canvas가 중앙에 오도록하기
  sceneInfos[0].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
  sceneInfos[2].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
};

/**애니메이션이 작동되는 범위를 구하는 함수 */
const calcValues = (values, currSecYOffset, currSecInfo) => {
  const currSecScrollHeight = currSecInfo.scrollHeight;
  /**현재 section에서 스크롤된 비율 */
  const scrollRatio = currSecYOffset / currSecScrollHeight;
  let returnVal;
  // values가 [0, 1, { start: 0.1, end: 0.2 }] 형태일 때
  if (values.length === 3) {
    // start ~ end 사이에서 애니메이션 실행
    /**애니메이션 시작 지점의 스크롤 값 */
    const partScrollStart = values[2].start * currSecScrollHeight;
    /**애니메이션 종료 지점의 스크롤 값 */
    const partScrollEnd = values[2].end * currSecScrollHeight;
    /**애니메이션이 동작하는 스크롤의 범위 값 */
    const partScrollHeight = partScrollEnd - partScrollStart;
    //currSecYOffset이 애니메이션 작동 범위 안에 있을 때
    if (currSecYOffset >= partScrollStart && currSecYOffset <= partScrollEnd) {
      returnVal =
        ((currSecYOffset - partScrollStart) / partScrollHeight) *
          (values[1] - values[0]) +
        values[0];
    }
    //currSecYOffset이 애니메이션 작동 시작점 보다 이전에 있을 때
    else if (currSecYOffset < partScrollStart) {
      returnVal = values[0];
    }
    //currSecYOffset이 애니메이션 작동 종료점 보다 이후에 있을 때
    else if (currSecYOffset > partScrollEnd) {
      returnVal = values[1];
    }
  } else {
    /**지정한 스크롤 범위의 끝값 - 시작값으로 범위를 구하고 거기에 scrollRatio를 곱한 뒤 시작값을 더한 스크롤 범위 */
    returnVal = scrollRatio * (values[1] - values[0]) + values[0];
  }
  return returnVal;
};

/**애니메이션 작동시키는 함수 */
const playAnimation = (currSecIdxRef, sceneInfos, prevScrollHeightRef) => {
  const { current } = currSecIdxRef;
  /**현재 section의 info object */
  const currSecInfo = sceneInfos[current];
  /**현재 section의 values */
  const values = currSecInfo.values;
  /**현재 section에서의 스크롤 된 길이 */
  const currSecYOffset = window.scrollY - (prevScrollHeightRef + 96);
  /**현재 section에서 스크롤 된 비율 */
  const scrollRatio = currSecYOffset / currSecInfo.scrollHeight;

  switch (currSecIdxRef.current) {
    case 0: // 첫번째 section에 있을 때
      let sequence_zero = Math.round(
        calcValues(values.imageSequence, currSecYOffset, currSecInfo)
      );
      currSecInfo.objs.context.drawImage(
        currSecInfo.objs.videoImagesArr[sequence_zero],
        0,
        0
      );
      currSecInfo.objs.canvas.style.opacity = calcValues(
        values.canvas_opacity,
        currSecYOffset,
        currSecInfo
      );

      // Loop through the messages
      for (let i = 0; i < currSecInfo.objs.sticky_msgs.length; i++) {
        /**opacity in 애니메이션 종료점과 opacity out 애니메이션 시작점을 중간 지점 */
        const turningPoint =
          (values.msg_opacity_in_arr[i][2].end +
            values.msg_opacity_out_arr[i][2].start) /
          2;

        if (scrollRatio <= turningPoint) {
          //sticy msg opacity 증가
          currSecInfo.objs.sticky_msgs[i].style.opacity = calcValues(
            values.msg_opacity_in_arr[i],
            currSecYOffset,
            currSecInfo
          );
          //sticy msg translateY 조절
          currSecInfo.objs.sticky_msgs[
            i
          ].style.transform = `translate3d(0, ${calcValues(
            values.msg_translate_in_arr[i],
            currSecYOffset,
            currSecInfo
          )}%,0)`;
        } else {
          //sticy msg opacity 증가
          currSecInfo.objs.sticky_msgs[i].style.opacity = calcValues(
            values.msg_opacity_out_arr[i],
            currSecYOffset,
            currSecInfo
          );
          //sticy msg translateY 조절
          currSecInfo.objs.sticky_msgs[
            i
          ].style.transform = `translate3d(0, ${calcValues(
            values.msg_translate_out_arr[i],
            currSecYOffset,
            currSecInfo
          )}%,0)`;
        }
      }
      break;
    case 2: // 세번째 section에 있을 때
      let sequence_two = Math.round(
        calcValues(values.imageSequence, currSecYOffset, currSecInfo)
      );
      currSecInfo.objs.context.drawImage(
        currSecInfo.objs.videoImagesArr[sequence_two],
        0,
        0
      );
      if (scrollRatio <= 0.5) {
        currSecInfo.objs.canvas.style.opacity = calcValues(
          values.canvas_opacity_in,
          currSecYOffset,
          currSecInfo
        );
      } else {
        currSecInfo.objs.canvas.style.opacity = calcValues(
          values.canvas_opacity_out,
          currSecYOffset,
          currSecInfo
        );
      }

      /**opacity in 애니메이션 종료점과 opacity out 애니메이션 시작점을 중간 지점 */
      const trdSecFstMsgTurningAniPoint =
        (values.msg_opacity_in_arr[0][2].end +
          values.msg_opacity_out_arr[0][2].start) /
        2;
      const trdSecSndtMsgTurningAniPoint =
        (values.msg_opacity_in_arr[1][2].end +
          values.msg_opacity_out_arr[1][2].start) /
        2;
      const trdSecTrdMsgTurningAniPoint =
        (values.msg_opacity_in_arr[2][2].end +
          values.msg_opacity_out_arr[2][2].start) /
        2;

      //scrollRatio가 turning point 이전에 있으면 opacity in , translate in 적용
      // 첫번째 메세지용
      if (scrollRatio <= trdSecFstMsgTurningAniPoint) {
        const fstMsg_opacity_in = calcValues(
          values.msg_opacity_in_arr[0],
          currSecYOffset,
          currSecInfo
        );
        const fstMsg_translate_in = calcValues(
          values.msg_translate_in_arr[0],
          currSecYOffset,
          currSecInfo
        );
        currSecInfo.objs.sticky_msgs[0].style.opacity = fstMsg_opacity_in;
        currSecInfo.objs.sticky_msgs[0].style.transform = `translate3d(0,${fstMsg_translate_in}%,0)`;
      }
      //scrollRatio가 turning point 이전에 있으면 opacity out, translate out 적용
      else {
        const fstMsg_opacity_out = calcValues(
          values.msg_opacity_out_arr[0],
          currSecYOffset,
          currSecInfo
        );

        const fstMsg_translate_out = calcValues(
          values.msg_translate_out_arr[0],
          currSecYOffset,
          currSecInfo
        );
        currSecInfo.objs.sticky_msgs[0].style.opacity = fstMsg_opacity_out;
        currSecInfo.objs.sticky_msgs[0].style.transform = `translate3d(0,${fstMsg_translate_out}%,0)`;
      }

      //==========================================================
      // 두번째 메세지용
      if (scrollRatio <= trdSecSndtMsgTurningAniPoint) {
        const sndMsg_opacity_in = calcValues(
          values.msg_opacity_in_arr[1],
          currSecYOffset,
          currSecInfo
        );
        const sndMsg_translate_in = calcValues(
          values.msg_translate_in_arr[1],
          currSecYOffset,
          currSecInfo
        );
        const sndMsgPin_opacity_in = calcValues(
          values.pins_opacity_in_arr[1],
          currSecYOffset,
          currSecInfo
        );
        const sndMsgPin_scaleY = calcValues(
          values.pins_scaleY_arr[1],
          currSecYOffset,
          currSecInfo
        );

        currSecInfo.objs.sticky_msgs[1].style.opacity = sndMsg_opacity_in;
        currSecInfo.objs.sticky_msgs[1].style.transform = `translate3d(0,${sndMsg_translate_in}%,0)`;
        currSecInfo.objs.pins[1].style.opacity = sndMsgPin_opacity_in;
        currSecInfo.objs.pins[1].style.transform = `scaleY(${sndMsgPin_scaleY})`;
      } else {
        const sndMsg_opacity_out = calcValues(
          values.msg_opacity_out_arr[1],
          currSecYOffset,
          currSecInfo
        );

        const sndMsg_translate_out = calcValues(
          values.msg_translate_out_arr[1],
          currSecYOffset,
          currSecInfo
        );
        const sndMsgPin_opacity_out = calcValues(
          values.pins_opacity_out_arr[1],
          currSecYOffset,
          currSecInfo
        );

        currSecInfo.objs.sticky_msgs[1].style.opacity = sndMsg_opacity_out;
        currSecInfo.objs.sticky_msgs[1].style.transform = `translate3d(0,${sndMsg_translate_out}%,0)`;
        currSecInfo.objs.pins[1].style.opacity = sndMsgPin_opacity_out;
      }
      //==========================================================
      // 세번째 메세지용
      if (scrollRatio <= trdSecTrdMsgTurningAniPoint) {
        const trdMsg_opacity_in = calcValues(
          values.msg_opacity_in_arr[2],
          currSecYOffset,
          currSecInfo
        );
        const trdMsg_translate_in = calcValues(
          values.msg_translate_in_arr[2],
          currSecYOffset,
          currSecInfo
        );
        const trdMsgPin_opacity_in = calcValues(
          values.pins_opacity_in_arr[2],
          currSecYOffset,
          currSecInfo
        );
        const trdMsgPin_scaleY = calcValues(
          values.pins_scaleY_arr[2],
          currSecYOffset,
          currSecInfo
        );
        currSecInfo.objs.sticky_msgs[2].style.opacity = trdMsg_opacity_in;
        currSecInfo.objs.sticky_msgs[2].style.transform = `translate3d(0,${trdMsg_translate_in}%,0)`;
        currSecInfo.objs.pins[2].style.opacity = trdMsgPin_opacity_in;
        currSecInfo.objs.pins[2].style.transform = `scaleY(${trdMsgPin_scaleY})`;
      } else {
        const trdMsg_opacity_out = calcValues(
          values.msg_opacity_out_arr[2],
          currSecYOffset,
          currSecInfo
        );

        const trdMsg_translate_out = calcValues(
          values.msg_translate_out_arr[2],
          currSecYOffset,
          currSecInfo
        );
        const trdMsgPin_opacity_out = calcValues(
          values.pins_opacity_out_arr[2],
          currSecYOffset,
          currSecInfo
        );
        currSecInfo.objs.sticky_msgs[2].style.opacity = trdMsg_opacity_out;
        currSecInfo.objs.sticky_msgs[2].style.transform = `translate3d(0,${trdMsg_translate_out}%,0)`;
        currSecInfo.objs.pins[2].style.opacity = trdMsgPin_opacity_out;
      }
      break;
    case 3: // 네번째 section에 있을 때
      break;
  }
  return <></>;
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
