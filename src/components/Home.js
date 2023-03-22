import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContent } from "../App";
import AlbumsCard from "./AlbumsCard";
import "./style.css";
const Home = () => {
	const { user } = useContext(UserContent);
	const [albums, setAlbums] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [photoAppear, setPhotoAppear] = useState([]);
	const searchRef = useRef();

	const { slug } = useParams();

	const { search } = useLocation();

	const title = new URLSearchParams(search).get("title") || "";

	useEffect(() => {
		if (user) {
			fetch("https://jsonplaceholder.typicode.com/albums")
				.then((res) => res.json())
				.then((res) => {
					const alb = res?.filter(
						(item) => item?.userId?.toString() === user?.id?.toString()
					);
					setAlbums([...alb]);
				});
		}
	}, [user]);

	useEffect(() => {
		if (user && albums) {
			fetch("http://localhost:8000/movie",{
				method: "GET",
			})
				.then((res) => res.json())
				.then((res) => {
					const abs = res?.filter((item) => {
						const some = albums?.some(
							(infor) => infor?.id?.toString() === item?.albumId?.toString()
						);
						if (some) {
							return item;
						}
					});
					setPhotos([...abs]);
				});
		}
	}, [user, albums]);

	useEffect(() => {
		if (photos) {
			if (slug !== "all") {
				const ab = photos?.filter(
					(item) => item?.albumId?.toString() === slug?.toString()
				);
				setPhotoAppear([...ab]);
			} else {
				setPhotoAppear([...photos]);
			}
		}
	}, [photos, slug]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user?.email) {
			navigate("/");
		}
	}, [user]);

	const handleSearch = () => {
		if (!searchRef.current.value) {
			navigate("/albums/all");
		} else {
			navigate(`/albums/all?title=${searchRef.current.value}`);
		}
	};

	useEffect(() => {
		if (title) {
			const newPhoto = photos?.filter((item) => item?.title?.includes(title));
			setPhotoAppear(newPhoto);
		} else {
			setPhotoAppear([...photos]);
		}
	}, [title, photos]);
	return (
		<div className="home">
			<div className="home_wrap">
				<div className="albums_category">
					<div
						onClick={() => {
							navigate("/albums/all");
						}}
						className="albums_title"
					>
						Ablums
					</div>
					{albums?.map((item, index) => (
						<Link key={index} to={`/albums/${item.id}`}>
							<div className="albums_ca_items">
								<i>Albums {item?.id}</i>
							</div>
						</Link>
					))}
				</div>
				<div className="albums_items">
					<div className="albums_search">
						<div className="albums_input">
							<input ref={searchRef} type="text" />
							<button onClick={handleSearch}>search</button>
						</div>
						<div className="user_name">
							<i>user:{user?.name}</i>
							<div>
								<Link to="/create">Create new a Photo</Link>
							</div>
						</div>
					</div>
					<div className="albums_items_wrap">
						{photoAppear?.map((item, index) => (
							<AlbumsCard key={index + "a"} item={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
