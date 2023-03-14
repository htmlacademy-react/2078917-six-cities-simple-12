import Main from '../../pages/main/main';

type AppProps = {
  placeNum: number;
};

function App({ placeNum }: AppProps): JSX.Element {
  return <Main placeNum={placeNum} />;
}

export default App;
