import {h} from '../../util';
import {Router, Route, go} from '..';
import {Link} from '../Link';

const StoryRouteExample2 = () => (
  <Router>
    <div>
      <ul>
        <li><a onClick={() => go('/')}>Home</a></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
      </ul>

      <hr/>

      <Route exact match='/' comp={Home} />
      <Route match='/about' comp={About} />
      <Route match='/topics' comp={Topics} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = (props) => {
  const {match} = props;

  console.log('PROPS', props);

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match}/rendering`}>
            Rendering with React
          </Link>
        </li>
        <li>
          <Link to={`${match}/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      <Route  comp={Topic}/>
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )}/>
    </div>
  );
};

const Topic = ({match}) => (
  <div>
    <h3>{match}</h3>
  </div>
);

export default StoryRouteExample2;