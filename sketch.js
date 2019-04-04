var sea_level_data, sea_temp_data;
var data_year;
var alpha_value = 255;
var temp_array = [];
var coral_width = 550;
// var month = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
var cover_array = [];
var cur_cover;

function preload() {
  thermo = loadImage("thermometer.png");
  coral = loadImage("coral_reef.png");
  // oil = loadImage("oil.png");
}

function setup() {

  textFont('Merriweather');
  frameRate(75);
  var cnv = createCanvas(550, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255);
  loadData();
  data_year = 0;

}

function draw() {
  //
  // for (i = 0; i < oil_count; i++) {
  //   image(oil, oil_pos[i][0], oil_pos[i][1], 40, 40);
  // }

  new_fc = frameCount - 4;
  var level_line = sea_level_data[new_fc + 2];
  var temp_line = sea_temp_data[new_fc + 8];
  var coral_line = coral_cover_data[new_fc + 2];


  if ((new_fc > 0) && (new_fc < 1610)) {

    // if (new_fc % 200 == 0) {
    //   push();
    //   image(oil, oil_count * 60, 50, 60, 60);
    //   pop();
    //   oil_count ++;
    // }

    var level_values = level_line.split(',');
    var level = float(level_values[1]);

    if (new_fc < 135) {
    var temp_values = temp_line.split(',');
    var temp = float(temp_values[1]);
    temp_array.push(temp + 0.4700088);
  }

    if (new_fc < 133) {
    var cover_values = coral_line.split(',');
    var cover = float(cover_values[1]);
    cover_array.push(cover);
    // console.log(new_fc);
    // console.log(cover);
  }


    mod_fc = new_fc % 12;

    stroke(0,160,176);


    if (mod_fc == 1) { // January
      // console.log(data_year + 1880);
      // console.log(temp_array[data_year]);
      // cur_temp = temp_array[data_year];
      // push();
      // noStroke();
      // fill(204,51,63);
      // delta = 132 * cur_temp
      // rect(461,305 - delta,15,162 + delta);
      // pop();
      push();
      noStroke();
      fill(0,160,176);
      textSize(42);
      textFont('Anton');
      text(data_year + 1880, 440, 80);
      pop();

      fill(0,160,176, alpha_value);
      beginShape();
      vertex(0, 650);
      vertex(0, 550 - 1.5 * (level + 183));
      curveVertex((mod_fc - 1) * 50, 500 - 1.5 * (level + 183));



    } else if (mod_fc == 0) { // December
      push();
      noStroke();
      fill(255);
      rect(400, 40, 200, 50);

      pop();

      mod_fc = 12;
      data_year ++;
      alpha_value -= 1.5;

      // if (coral_width > 50) {
      //   coral_width -= 50;
      // }

      curveVertex((mod_fc - 1) * 50, 500 - 1.5 * (level + 183));
      vertex(550, 500 - 1.5 * (level + 183));
      vertex(550, 650);
      endShape(CLOSE);
    } else {
      curveVertex((mod_fc - 1) * 50, 500 - 1.5 * (level + 183));
    }

    // push();
    // stroke(0);
    // fill(0);
    // text(new_fc, (mod_fc - 1) * 50, 500 - 1.5 * (level + 183));
    // ellipse((mod_fc - 1) * 50, 500 - 1.5 * (level + 183), 1, 1);
    // pop();
    if ((mod_fc == 1) && (data_year < temp_array.length)) { // January
      cur_temp = temp_array[data_year];
    }

    if ((mod_fc == 1) && (data_year < cover_array.length)) { // January
      cur_cover = 500 + cover_array[data_year] * 5;
      // console.log(1880 + data_year);
      // console.log(cur_cover);
    }

    push();
    image(thermo,445,110);
    noStroke();
    fill(204,51,63);
    ellipse(473,446,40,40);
    delta = 132 * cur_temp
    rect(466,265 - delta,15,162 + delta);
    fill(0);
    textFont('Merriweather');
    textSize(12);
    text("0", 530, 270);
    text("+1", 530, 270-132+2);
    text("-1", 530, 270+132-4);

    pop();


    // push();
    // noStroke();
    // fill(204,51,63);
    // delta = 132 * cur_temp
    // rect(461,305 - delta,15,162 + delta);
    // pop();
  }
  // push();
  // noStroke();
  // fill(204,51,63);
  // delta = 132 * cur_temp
  // rect(461,305 - delta,15,162 + delta);
  // pop();
push();
// tint(255, alpha_value);

image(coral, -350, 280);


push();
fill(0,180);
rect(cur_cover, 500, 50000000, 550);
pop();
pop();


  push();
  stroke(0);
  strokeWeight(4);
  fill(255);
  textSize(42);
  if ((data_year < cover_array.length) && (cover_array[data_year] != 0)){
  text(str(cover_array[data_year]) + "%", 330, 570);
} else if (cover_array[data_year] != 0) {
  text("-48%", 330, 570);
}
  textSize(18);
  text("coral", 460, 548);
  text("cover", 460, 563);
  textSize(12);
  text("vs. 1985", 462, 575);
  pop();




push();
noStroke();
fill(0);
textSize(24);
text("sea level rise since 1880 (cm)", 40, 50);
pop();

push();
noStroke();
fill(0);
textSize(16);
for (var tick = -183; tick < 100; tick += 10) {
  var mark = tick + 183;
  if (mark % 20 == 0) {
    if (mark/10 > 0) {
      text(mark/10, 30, (500 - 1.5 * mark) + 6);
    }
  }
}

pop();

push();
noStroke();
fill(0);
textSize(24);
text("sea", 410, 350);
text("surface", 360, 375);
text("temp", 385, 400);
textSize(18);
text("vs. 1880 (°F)", 340, 425);

pop();

push();
noStroke();
fill(237,201,81);
textSize(60);
textFont('Anton');
text("WHAT HAVE", 80, 211);
text("WE DONE", 80, 269);
text("TO OUR", 80, 327);
text("OCEANS?", 80, 385);
pop();

push();
strokeWeight(2);
stroke(0);
line(20, -height, 20, height);

for (var y=-height + 20; y < height; y+=30) {
  line(15, y, 25, y);
}



line(-width, 500, width, 500);
// var month_index = 0
for (var x=-width; x < width; x+=50) {
  line(x, 495, x, 505);
}
pop();

push();
strokeWeight(2);
stroke(255);
for (var x=-width; x < width; x+=50) {
  line(x, 500, x, 505);
}
pop();

push();
noStroke();
fill(0);
textSize(16);
text("J          F          M          A         M           J           J           A           S          O          N         D", 0, 490);
pop();

push();
noStroke();
fill(255);
textSize(16);
text("        -90      -80     -70     -60      -50     -40     -30     -20     -10         0   (%)", 0, 520);

pop();

}

function loadData() {
  sea_level_data = loadStrings("sea_level.csv");
  sea_temp_data = loadStrings("sea-surface-temp.csv");
  coral_cover_data = loadStrings("coral_cleaned.csv");
}
