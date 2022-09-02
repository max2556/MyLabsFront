function getNum(str) {
    let i = 0;
    for (; i < str.length; i++) {
        if (str[i] === "-") return null;
        if (isFinite(Number(str[i])) && str[i] != ' ')
            break;
    }
    let j = i;
    for (; j < str.length; j++) {
        if (str[i] === "-") return null;
        if (str[j] != "." && (str[j] == ' ' || !isFinite(Number(str[j]))))
            break;
    }
    var cx = Number(str.slice(i, j));
    if (!cx) console.log("cx error")

    i = j;
    for (; i < str.length; i++) {
        if (str[i] === "-") return null;
        if (isFinite(Number(str[i])) && str[i] != ' ')
            break;
    }
    j = i;
    for (; j < str.length; j++) {
        if (str[i] === "-") return null;
        if (str[j] != "." && (str[j] == ' ' || !isFinite(Number(str[j]))))
            break;
    }
    var cy = Number(str.slice(i, j));
    if (!cy) console.log("cx error")

    var res = [cx, cy]
    return res;
}

var res = ""
for (let i = 0; i < temp2.children.length; i++) {
    let nums = getNum(temp2.children[i].getAttribute("d"));
    if (nums == null) continue;
    let cx = nums[0] + 13;
    let cy = nums[1];
    res += `<circle cx="${cx}" cy="${cy}" r="14" fill="#2BA84A" opacity="0.17"/>`
}

temp.innerHTML = res;

