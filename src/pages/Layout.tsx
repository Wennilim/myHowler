import { Link, Outlet } from 'react-router-dom';
import { SoundProvider } from '../SoundContext';

export const Layout = () => {
	const soundSrcList = ['/sound/clear.mp3', '/sound/tapEffect.mp3'];
	return (
		<SoundProvider soundSrcList={soundSrcList}>
			<div>
				<nav>
					<ul>
						<Link to='/'>Home</Link>

						<li>
							<Link to='/blogs'>Blogs</Link>
						</li>
						<li>
							<Link to='/contact'>Contact</Link>
						</li>
					</ul>
				</nav>
				<Outlet />
			</div>
		</SoundProvider>
	);
};
