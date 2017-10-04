export default function stringContains(string) {
    return string.toLowerCase().indexOf(string.toLowerCase()) > -1;
}