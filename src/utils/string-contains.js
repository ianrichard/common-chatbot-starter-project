export default function stringContains(haystack, needle) {
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
}