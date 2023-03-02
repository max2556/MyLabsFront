const VK_API_VERSION = "5.131";
const VK_API_ACCESS_TOKEN = "6f5d85aa6f5d85aa6f5d85aa576f20f0c166f5d6f5d85aa0d883fdb093dedf6973414c3";
const REQUEST_BASE_URL = "https://vk.com/cockyasfxck?w=wall270022066_765";
const REPLY_BASE_URL = "https://vk.com/wall270022066_765";

const comments = {};
const Users = {};
let raw_comments = {};

//https://vk.com/cockyasfxck?w=wall270022066_765
call_method("wall.getComments", {
    owner_id: 270022066,
    post_id: 765,
    extended: true,
    count: 10000
}, "prepareComments");


// VK.init({ apiId: 8222059 });
// const response = await getComments(270022066, 765);
// await prepareData(response);
// const comments = await createComments(response);
// await html_render(comments);

function getUserIDs() {
    let result = "";
    for (let i = 0; i < 20; i++) {
        let user = raw_comments.profiles[i];
        if (user)
            result += user.id + ',';
    }

    result = result.slice(0, -1);

    return result;
}

function prepareComments(response) {
    console.log(response);
    raw_comments = response.response;

    call_method("users.get", {
        user_ids: getUserIDs(),
        fields: "photo_400_orig"
    }, "prepareUsers");
}

function prepareUsers(response) {
    console.log(response);

    for (let user of response.response) {
        /*  
        Will be 
        Profiles = {
            1: Иванов Иван,
            2342: Сергеев Сергей
            ...
            ...
            ...
        }
        */
        Users[user.id] = {
            name: `${user.first_name} ${user.last_name}`,
            photo: getIcon(user)
        };
    }

    html_render(createComments());
}

/**
 * @brief Takes user JSON. Search through each size of photo, search for 'x' size.
 * 
 * @param {JSON} user - response of VK API Users.get method;
 * @returns user photo url of 'x' size;
 */
function getIcon(user) {
    let imgURL = user["photo_400_orig"];
    if (!imgURL) imgURL = "https://my-labs.ru/assets/default_vk_photo.jpg";
    return imgURL;
}

/**
 * @brief get response as input, parse into important data
 * @param {JSON} vk_response VK API walls.getComments response
 * @returns array of comments objects
 */
function createComments() {
    const result_comments = [];

    const items = raw_comments.items;

    for (const comment of items) {
        const result_comment = {};
        /*
          {
              Name: Иванов Иван
              Content: Some very important text...
              AuthorIcon: https://...
              Url: https://...
              Attachments: [...]
          }
        */

        const authorID = comment.from_id;
        const author = Users[authorID];

        result_comment["Name"] = author.name
        result_comment["Content"] = comment.text;
        result_comment["AuthorIcon"] = author.photo;
        result_comment["Attachments"] = getAttachments(comment.attachments);
        result_comment["Url"] = `${REPLY_BASE_URL}?reply=${comment.id}`;
        result_comment["date"] = buildDateString(comment.date);

        if (!result_comment.Content && !result_comment.Attachments) continue;
        result_comments.push(result_comment);
    }

    return result_comments;
}

function getAttachments(attachments_array) {
    if (!attachments_array) return null;
    const result_attachments = [];
    for (let attachment of attachments_array) {
        if (attachment.type !== "photo") continue;

        result_attachments.push(attachment.photo.sizes.find((size) => { return size.type === "x" }).url);
    }
    return result_attachments;
}

function html_render(comments_array) {
    comments_array = shuffle(comments_array);  //Randomize comments

    const commentsInSlide = 3;
    const slideCount = Math.ceil(comments_array.length / commentsInSlide);

    const commentsSectionEl = document.querySelector(".comments");        //whole comments section
    const mountEl = commentsSectionEl.querySelector(".mount");            //place for append new comments
    const template = commentsSectionEl.querySelector(".example_comment"); //template for comments render

    for (let slide = 0; slide < slideCount; ++slide) {
        const newSlide = document.createElement('div');
        newSlide.classList.add('slide');
        mountEl.append(newSlide);

        const adjusterEl = document.createElement("div");
        adjusterEl.classList.add('adjuster');
        newSlide.append(adjusterEl);

        for (let i = 0; i < commentsInSlide; ++i) {
            const index = slide * commentsInSlide + i;
            const comment = comments_array[index];
            if (!comment) break;

            const newComment = template.content.cloneNode(true); //template clone
            //fill data in placeholders
            newComment.querySelector(".icon").src = comment.AuthorIcon;
            newComment.querySelector(".fio").textContent = comment.Name;
            newComment.querySelector(".comment").textContent = comment.Content;
            newComment.querySelector(".date").textContent = comment.date;

            const links = newComment.querySelectorAll(".vk_link");
            for (let link of links)
                link.href = comment.Url;

            if (comment.Attachments)
                for (let attachment of comment.Attachments) {
                    const newAttachmentElement = document.createElement('img');
                    newAttachmentElement.src = attachment;
                    newAttachmentElement.classList.add("attachment", "scroll-block");
                    newAttachmentElement.onclick = () => {
                        open(newAttachmentElement.src);
                    }
                    newComment.querySelector(".attachments").append(newAttachmentElement);
                }
            else {
                let attachmentsHolderEl = newComment.querySelector(".attachments");
                attachmentsHolderEl.parentNode.removeChild(attachmentsHolderEl);
            }

            adjusterEl.append(newComment);
        }
    }
}

function call_method(method, params, cb) {
    const script_element = document.createElement('SCRIPT');
    script_element.src = `https://api.vk.com/method/${method}?${parse_params(params)}&access_token=${VK_API_ACCESS_TOKEN}&v=${VK_API_VERSION}&callback=${cb}`;
    document.getElementsByTagName("head")[0].appendChild(script_element);
}

function parse_params(params) {
    let result = "";

    for (let param in params) {
        result += `${param}=${params[param]}&`;
    }
    result = result.slice(0, -1);

    return result;
}

function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function buildDateString(rawDate) {
    const fixedDate = new Date(rawDate*1000);
    const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
    const getMinutes = (v) => {
        let str = "0" + v.getMinutes();
        if(str.length != 2) str = str.substring(1);
        return str;
    }
    const getTime = (v) => `${v.getHours()}:${getMinutes(v)}`;
    return `${fixedDate.getDate()} ${months[fixedDate.getMonth()]} ${fixedDate.getFullYear()} в ${getTime(fixedDate)}`;
}