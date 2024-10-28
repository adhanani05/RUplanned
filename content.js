(function () {
  instructor = document.querySelectorAll('[title="Instructor"]');
  course = document.querySelectorAll('[title="Section Title"]');
  instructorList = Array.from(instructor).map((el) => el.innerText);
  uniqueInstructors = [...new Set(instructorList)]; // store array of all instructors
  console.log(uniqueInstructors);

  const tooltipElements = document.querySelectorAll(".dijitTooltipData");

  // initialize an array to store the extracted data
  const scheduleData = [];

  tooltipElements.forEach((tooltip) => {
    const text = tooltip.innerText; // get all inner text
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line); // split and trim lines, filter out empty lines

    // initialize an object for storing course data
    const courseData = {
      title: lines[0] || "", // default to empty string if not available
      course: lines[1]?.replace("Course:", "").trim() || "", // use optional chaining and default
      section: lines[2]?.replace("Section:", "").trim() || "",
      index: lines[3]?.replace("Index:", "").trim() || "",
      time: lines[4]?.replace("Time:", "").trim() || "",
      status: lines[5]?.replace("Status:", "").trim() || "",
      location: lines[6]?.replace("Location:", "").trim() || "",
    };

    scheduleData.push(courseData); // add data to the array
  });
})();
