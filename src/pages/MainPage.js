import LatestItemsController from "../Components/MainPage/LatestItemsController";
import MainPageWrapper from "../Components/MainPage/MainPageWrapper";
import Cloud from "../Components/MainPage/Cloud";
import LargestCollections from "../Components/MainPage/CollectionsSection/LargestCollections";
import LatestItems from "../Components/MainPage/LatestItemsSection/LatestItems";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <LargestCollections />
      <LatestItems />
      {/* <LatestItemsController /> */}
      <Cloud />
    </MainPageWrapper>
  );
};
export default MainPage;
