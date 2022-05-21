import LargestCollectionsController from "./LargestCollectionsController";
import LatestItemsController from "./LatestItemsController";
import MainPageWrapper from "./MainPageWrapper";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <LatestItemsController />
      <LargestCollectionsController />
    </MainPageWrapper>
  );
};
export default MainPage;
