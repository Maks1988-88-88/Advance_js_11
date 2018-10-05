const laptops = [
    {
        size: 13,
        color: "white",
        price: 28000,
        release_date: 2015,
        name: 'Macbook Air White 13"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 13,
        color: "gray",
        price: 32000,
        release_date: 2016,
        name: 'Macbook Air Gray 13"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 13,
        color: "black",
        price: 35000,
        release_date: 2017,
        name: 'Macbook Air Black 13"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 15,
        color: "white",
        price: 45000,
        release_date: 2015,
        name: 'Macbook Air White 15"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 15,
        color: "gray",
        price: 55000,
        release_date: 2016,
        name: 'Macbook Pro Gray 15"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 15,
        color: "black",
        price: 45000,
        release_date: 2017,
        name: 'Macbook Pro Black 15"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 17,
        color: "white",
        price: 65000,
        release_date: 2015,
        name: 'Macbook Air White 17"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 17,
        color: "gray",
        price: 75000,
        release_date: 2016,
        name: 'Macbook Pro Gray 17"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    },
    {
        size: 17,
        color: "black",
        price: 80000,
        release_date: 2017,
        name: 'Macbook Pro Black 17"',
        img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
        descr:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
    }
];

const filterBtn = document.querySelector('button[type="submit"]');
const clearBtn = document.querySelector('button[type="reset"]');
const container = document.querySelector('.laptop-container');

const source = document.querySelector('#laptop-list').innerHTML.trim();
const template = Handlebars.compile(source);

function basicLayout() {
  const markup = laptops.reduce((acc, item) => acc + template(item), '');
  container.innerHTML = markup;
  
}

basicLayout();

function createFilterObject(event) {
  const filter = { size: [], color: [], release_date: [] };
  let sizeCheckboxes = Array.from(
    document.querySelectorAll('input[name="size"]:checked')
  );
  let colorCheckboxes = Array.from(
    document.querySelectorAll('input[name="color"]:checked')
  );
  let releaseDateCheckboxes = Array.from(
    document.querySelectorAll('input[name="release_date"]:checked')
  );
  filter.size = sizeCheckboxes.map(item => item.value);
  filter.color = colorCheckboxes.map(item => item.value);
  filter.release_date = releaseDateCheckboxes.map(item => item.value);
  console.log("filter: ", filter);
  return filter;
}

const filterByParameter = (filteredObject, laptop, param) => {
  let correspondingParam = false;
  if (filteredObject[param].length === 0) {
    correspondingParam = true;
    return correspondingParam;
  }
  filteredObject[param].forEach(filterParam => {
    if (filterParam == laptop[param]) {
      correspondingParam = true;
    }
  });
  return correspondingParam;
};

function filterLaptops(event) {
  event.preventDefault();

  const filteredObject = createFilterObject();

  let filteredLaptops = laptops
    .filter(laptop => filterByParameter(filteredObject, laptop, "color"))
    .filter(laptop => filterByParameter(filteredObject, laptop, "size"))
    .filter(laptop => filterByParameter(filteredObject, laptop, "release_date")
    );

  console.log(filteredLaptops);

  const markup = filteredLaptops.reduce(
  (acc, item) => acc + template(item),"");
  container.innerHTML = markup;
}

filterBtn.addEventListener("click", filterLaptops);

clearBtn.addEventListener("click", basicLayout);
