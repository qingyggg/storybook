import ArticleCard from '../components/ArticleCard';
import ArticleList from '../components/ArticleList';

//this page used to show article list
export default function Home() {
  return (
    <div className='flex justify-center mt-6 w-full '>
      <ArticleList />
    </div>
  );
}
