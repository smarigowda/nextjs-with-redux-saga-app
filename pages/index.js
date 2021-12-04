import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "../store";
import { loadData, startClock, tickClock, increment } from "../actions";
import Page from "../components/page";

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // useEffect runs only on the client side
    // so the startClock action will be dispached on client side
    dispatch(startClock());
  }, [dispatch]);

  return <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  console.log("inside getStaticProps.. store.dispatch");
  store.dispatch(tickClock(true));
  store.dispatch(increment());
  store.dispatch(increment());
  store.dispatch(increment());

  if (!store.getState().placeholderData) {
    store.dispatch(loadData());
    console.log("ending saga on server now...");
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});

export default Index;
