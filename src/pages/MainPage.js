import LargestCollectionsController from "../Components/MainPage/LargestCollectionsController";
import LatestItemsController from "../Components/MainPage/LatestItemsController";
import MainPageWrapper from "../Components/MainPage/MainPageWrapper";
import Cloud from "../Components/MainPage/Cloud";

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
