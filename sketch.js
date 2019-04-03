var sea_level_data, sea_temp_data;
var data_year;
var alpha_value = 255;
var temp_array = [];
var coral_width = 550;

// var oil_pos = [
//   [50, 450],
//   [300, 400],
//   [450, 375],
//   [100, 350],
//   [500, 325],
//   [150, 275],
//   [350, 250],
//   [175, 225]
// ];
// var oil_count = 1;

function preload() {
  thermo = loadImage("thermometer.png");
  coral = loadImage("coral_reef.png");
  // oil = loadImage("oil.png");
}

function setup() {
  textFont('Anton');
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
    temp_array.push(temp);
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
      fill(0);
      textSize(36);
      text(data_year + 1880, 30, 80);
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
      rect(30, 45, 80, 40);
      pop();

      mod_fc = 12;
      data_year ++;
      alpha_value -= 1.5;
      if (coral_width > 50) {
        coral_width -= 50;
      }

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

    push();
    image(thermo,35,130);
    noStroke();
    fill(204,51,63);
    ellipse(63,466,40,40);
    delta = 132 * cur_temp
    rect(56,285 - delta,15,162 + delta);
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
fill(0,160,176,200);
rect(coral_width, 500, 50000000, 550);
pop();
pop();

push();
noStroke();
fill(255);
textSize(42);
text("30%", 370, 570);
textSize(24);
text("coral", 460, 550);
text("cover", 460, 570);

pop();

push();
noStroke();
fill(0,160,176);
textSize(24);
text("sea level", 430, 50);
pop();

push();
noStroke();
fill(0);
textSize(24);
text("sea", 100, 450);
text("surface", 100, 475);
text("temp", 100, 500);

pop();

push();
noStroke();
fill(237,201,81);
textSize(60);
text("WHAT HAVE", 180, 211);
text("WE DONE", 180, 269);
text("TO OUR", 180, 327);
text("OCEANS?", 180, 385);
pop();

}

function loadData() {
  sea_level_data = loadStrings("sea_level.csv");
  sea_temp_data = loadStrings("sea-surface-temp.csv");
}
