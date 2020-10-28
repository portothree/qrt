function deg2rad(degrees) {
	return degrees * (Math.PI / 180);
}

function rad2deg(radians) {
	return radians * (180 / Math.PI);
}

module.exports = {
	deg2rad,
	rad2deg,
};
