function mapSequence(sourceArray, high, low, accuracy, ratio_accuracy){
	low = typeof low !== 'undefined' ? low : 0;
	accuracy = typeof accuracy !== 'undefined' ? accuracy : 2;
	ratio_accuracy = typeof ratio_accuracy !== 'undefined' ? ratio_accuracy : 4;
	var s = sourceArray,
		s_lo = Math.min.apply(Math, s),
		s_hi = Math.max.apply(Math, s),
		t_val,
		t_lo = low,
		t_hi = high,
		s_z_hi = s_hi - s_lo,
		t_z_hi = t_hi - t_lo,
		value_ratio,
		t = s.map(function(value){
			value-=s_lo;
			value_ratio = (value/s_z_hi).toFixed(ratio_accuracy);
			t_val = (t_z_hi * value_ratio + t_lo).toFixed(accuracy);
			return t_val;
		});
	return t;
}

// var sequence = function(length, max, negative){
// 	length = typeof length !== 'undefined' ? length : 8;
// 	max = typeof max !== 'undefined' ? max : 1000;
// 	negative = typeof negative !== 'undefined' ? negative : 2;
// 	var array = [];
// 	for(i=0; i<length; i++){
// 		array.push((((0.5*negative)-Math.random())*max).toFixed(2));
// 	}
// 	return array;
// }

// console.dir(mapSequence(sequence(4, 24000), 70));