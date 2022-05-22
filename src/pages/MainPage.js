import LargestCollectionsController from "../MainPage/LargestCollectionsController";
import LatestItemsController from "../MainPage/LatestItemsController";
import MainPageWrapper from "../MainPage/MainPageWrapper";
import Cloud from "../MainPage/Cloud";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <LatestItemsController />
      <LargestCollectionsController />
      <Cloud />
    </MainPageWrapper>
  );
};
export default MainPage;
