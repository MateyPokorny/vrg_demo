import MainMap from './components/MainMap';

export const revalidate = 60;

const App: React.FC = () => {

  return (
    <>
    <div>
      <div className="">
       <MainMap />
      </div>
      
    </div>
    </>
  );
}

export default App;
