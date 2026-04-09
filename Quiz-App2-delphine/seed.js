require("dotenv").config();
const mongoose = require("mongoose");

const Categorie = require("./models/categorie");
const Quiz      = require("./models/quiz");

const data = [
  {
    categorie: "Sciences",
    title: "Quiz Sciences",
    questions: [
      {
        question: "Quelle est la formule chimique de l'eau ?",
        options: ["H2O", "CO2", "O2", "H2SO4"],
        correct: "H2O"
      },
      {
        question: "Combien de chromosomes possède un être humain ?",
        options: ["23", "46", "48", "44"],
        correct: "46"
      },
      {
        question: "Quel est l'élément chimique le plus abondant dans l'univers ?",
        options: ["Oxygène", "Carbone", "Hydrogène", "Hélium"],
        correct: "Hydrogène"
      },
      {
        question: "Quelle est la vitesse de la lumière dans le vide ?",
        options: ["300 000 km/s", "150 000 km/s", "450 000 km/s", "200 000 km/s"],
        correct: "300 000 km/s"
      },
      {
        question: "Quel organe produit l'insuline dans le corps humain ?",
        options: ["Le foie", "Le pancréas", "Le rein", "L'estomac"],
        correct: "Le pancréas"
      },
      {
        question: "Quelle est la couche de l'atmosphère la plus proche de la Terre ?",
        options: ["Stratosphère", "Mésosphère", "Troposphère", "Thermosphère"],
        correct: "Troposphère"
      },
      {
        question: "Quel est le symbole chimique du fer ?",
        options: ["Fe", "Fr", "Fi", "Fn"],
        correct: "Fe"
      },
      {
        question: "Combien de planètes composent notre système solaire ?",
        options: ["7", "8", "9", "10"],
        correct: "8"
      },
      {
        question: "Quel scientifique a formulé la théorie de la relativité ?",
        options: ["Newton", "Curie", "Einstein", "Galilée"],
        correct: "Einstein"
      },
      {
        question: "Quelle est la principale source d'énergie du Soleil ?",
        options: ["Fission nucléaire", "Fusion nucléaire", "Combustion chimique", "Énergie électrique"],
        correct: "Fusion nucléaire"
      }
    ]
  },
  {
    categorie: "Développement",
    title: "Quiz Développement",
    questions: [
      {
        question: "Que signifie HTML ?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "HyperText Modern Links", "Home Tool Markup Language"],
        correct: "HyperText Markup Language"
      },
      {
        question: "Quel mot-clé JavaScript déclare une variable non réassignable ?",
        options: ["var", "let", "const", "static"],
        correct: "const"
      },
      {
        question: "Quelle méthode permet d'ajouter un élément à la fin d'un tableau en JS ?",
        options: ["push()", "pop()", "shift()", "splice()"],
        correct: "push()"
      },
      {
        question: "Que retourne typeof null en JavaScript ?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correct: "'object'"
      },
      {
        question: "Quel est le rôle principal de Node.js ?",
        options: ["Créer des bases de données", "Exécuter JavaScript côté serveur", "Styliser des pages web", "Gérer les images"],
        correct: "Exécuter JavaScript côté serveur"
      },
      {
        question: "Quelle est la différence entre == et === en JavaScript ?",
        options: [
          "=== vérifie la valeur et le type",
          "== vérifie la valeur et le type",
          "Ils sont identiques",
          "=== est plus lent"
        ],
        correct: "=== vérifie la valeur et le type"
      },
      {
        question: "Que signifie API ?",
        options: ["Application Programming Interface", "Advanced Protocol Integration", "Automated Program Installer", "Application Protocol Internet"],
        correct: "Application Programming Interface"
      },
      {
        question: "Quel code HTTP signifie 'Ressource non trouvée' ?",
        options: ["200", "301", "404", "500"],
        correct: "404"
      },
      {
        question: "Quelle commande Git permet de sauvegarder ses modifications ?",
        options: ["git push", "git save", "git commit", "git merge"],
        correct: "git commit"
      },
      {
        question: "En CSS, quelle propriété permet de centrer horizontalement un élément block ?",
        options: ["text-align: center", "align: center", "margin: 0 auto", "position: center"],
        correct: "margin: 0 auto"
      }
    ]
  },
  {
    categorie: "Network",
    title: "Quiz Network",
    questions: [
      {
        question: "Que signifie IP dans TCP/IP ?",
        options: ["Internet Protocol", "Internal Process", "Interface Provider", "Input Protocol"],
        correct: "Internet Protocol"
      },
      {
        question: "Sur combien de bits est codée une adresse IPv4 ?",
        options: ["16 bits", "32 bits", "64 bits", "128 bits"],
        correct: "32 bits"
      },
      {
        question: "Quel est le rôle d'un DNS ?",
        options: [
          "Sécuriser les connexions réseau",
          "Traduire les noms de domaine en adresses IP",
          "Attribuer des adresses IP dynamiques",
          "Filtrer les paquets réseau"
        ],
        correct: "Traduire les noms de domaine en adresses IP"
      },
      {
        question: "Quel port est utilisé par le protocole HTTPS par défaut ?",
        options: ["80", "21", "443", "8080"],
        correct: "443"
      },
      {
        question: "Quelle couche du modèle OSI gère le routage des paquets ?",
        options: ["Couche physique", "Couche liaison", "Couche réseau", "Couche transport"],
        correct: "Couche réseau"
      },
      {
        question: "Que fait un routeur ?",
        options: [
          "Connecte des appareils en Bluetooth",
          "Dirige les paquets entre différents réseaux",
          "Convertit les signaux analogiques en numériques",
          "Stocke les données localement"
        ],
        correct: "Dirige les paquets entre différents réseaux"
      },
      {
        question: "Quelle technologie permet de créer un réseau privé sur Internet ?",
        options: ["FTP", "VPN", "DNS", "SMTP"],
        correct: "VPN"
      },
      {
        question: "Combien de bits compose une adresse IPv6 ?",
        options: ["32 bits", "64 bits", "128 bits", "256 bits"],
        correct: "128 bits"
      },
      {
        question: "Quel protocole est utilisé pour envoyer des emails ?",
        options: ["HTTP", "FTP", "SMTP", "SSH"],
        correct: "SMTP"
      },
      {
        question: "Quelle commande permet de tester la connectivité réseau entre deux machines ?",
        options: ["tracert", "ipconfig", "ping", "netstat"],
        correct: "ping"
      }
    ]
  },
  {
    categorie: "Culture générale",
    title: "Quiz Culture générale",
    questions: [
      {
        question: "Quelle est la capitale de l'Australie ?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: "Canberra"
      },
      {
        question: "En quelle année a eu lieu la Révolution française ?",
        options: ["1776", "1789", "1804", "1815"],
        correct: "1789"
      },
      {
        question: "Combien de pays composent l'Union européenne en 2024 ?",
        options: ["25", "27", "30", "28"],
        correct: "27"
      },
      {
        question: "Qui a peint la Joconde ?",
        options: ["Michel-Ange", "Raphaël", "Léonard de Vinci", "Botticelli"],
        correct: "Léonard de Vinci"
      },
      {
        question: "Quel est le pays le plus grand du monde en superficie ?",
        options: ["Canada", "Chine", "États-Unis", "Russie"],
        correct: "Russie"
      },
      {
        question: "Quelle langue est la plus parlée dans le monde ?",
        options: ["Anglais", "Espagnol", "Mandarin", "Hindi"],
        correct: "Mandarin"
      },
      {
        question: "Quel écrivain a créé le personnage de Sherlock Holmes ?",
        options: ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe", "Jules Verne"],
        correct: "Arthur Conan Doyle"
      },
      {
        question: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
        options: ["1965", "1967", "1969", "1972"],
        correct: "1969"
      },
      {
        question: "Quel est le fleuve le plus long du monde ?",
        options: ["L'Amazone", "Le Congo", "Le Nil", "Le Yangtsé"],
        correct: "Le Nil"
      },
      {
        question: "Combien y a-t-il de continents sur Terre ?",
        options: ["5", "6", "7", "8"],
        correct: "7"
      }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connecté à MongoDB");

    for (const item of data) {
      // 1. Créer ou récupérer la catégorie
      let cat = await Categorie.findOne({ nom: item.categorie });
      if (!cat) {
        cat = await Categorie.create({ nom: item.categorie });
        console.log(`📁 Catégorie créée : ${item.categorie}`);
      } else {
        console.log(`📁 Catégorie existante : ${item.categorie}`);
      }

      // 2. Vérifier si le quiz existe déjà pour éviter les doublons
      const existing = await Quiz.findOne({ title: item.title });
      if (existing) {
        console.log(`⚠️  Quiz déjà existant, ignoré : ${item.title}`);
        continue;
      }

      // 3. Créer le quiz avec ses questions
      await Quiz.create({
        title:      item.title,
        categorie:  cat._id,
        questions:  item.questions
      });
      console.log(`✅ Quiz créé : ${item.title} (${item.questions.length} questions)`);
    }

    console.log("\n🎉 Insertion terminée !");
    process.exit(0);

  } catch (err) {
    console.error("❌ Erreur :", err.message);
    process.exit(1);
  }
}

seed();