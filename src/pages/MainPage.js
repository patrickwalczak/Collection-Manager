import LargestCollectionsController from "../MainPage/LargestCollectionsController";
import LatestItemsController from "../MainPage/LatestItemsController";
import MainPageWrapper from "../MainPage/MainPageWrapper";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <LatestItemsController />
      <LargestCollectionsController />
    </MainPageWrapper>
  );
};
export default MainPage;
