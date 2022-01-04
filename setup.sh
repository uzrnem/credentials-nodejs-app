echo Let\'s initiate installation process...
read -p "Enter Databse Host : " hostname
read -p "Enter Databse Name : " dbname

echo "module.exports = {"  >> 'env.js'
echo "	HOST : '$hostname',"  >> 'env.js'
echo "	DATABASE : '$dbname'"  >> 'env.js'
echo "};"  >> 'env.js'
echo "Setup is completed..!"