export default function EnvStorage() {
	var _this = this;
	this.setEnv = function(data) {
		for (var d in data) {
			_this[d] = data[d];
		}
	};
}