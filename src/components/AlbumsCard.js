import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const AlbumsCard = ({ item }) => {
	return (
		<Link className="card_wrap" to={`/detail/${item.albumId}/${item?.id}`}>
			<div className="card">
				<div className="card_img">
					<img src={item?.thumbnailUrl} alt="anh" />
				</div>
				<div className="card_title">{item?.title}</div>
				<div className="card_title">Albums: {item?.albumId}</div>
			</div>
		</Link>
	);
};

export default AlbumsCard;
