import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
const Detail = () => {
	const [photo, setPhoto] = useState({});
	const { slug, id } = useParams();
	const [album, setAlbum] = useState({});
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/photos")
			.then((res) => res.json())
			.then((res) => {
				const abs = res?.find(
					(item) => item?.id?.toString() === id?.toString()
				);
				setPhoto(abs);
			});
	}, [slug, id]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/albums")
			.then((res) => res.json())
			.then((res) => {
				const abs = res?.find(
					(item) => item?.id?.toString() === slug?.toString()
				);
				setAlbum(abs);
			});
	}, [slug, id]);
	return (
		<div className="detail">
			<div className="detail_wrap">
				<div className="detail_container">
					<div className="detail_img">
						<img src={photo?.url} alt="anh" />
					</div>
					<div className="detail_title">
						Title: <span>{photo?.title}</span>
					</div>
					<div className="detail_title">
						Album: <span>{album?.title}</span>
					</div>
				</div>
				<div className="comment">Comments:</div>
			</div>
		</div>
	);
};

export default Detail;
