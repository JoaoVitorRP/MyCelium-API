import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.posts.deleteMany({});
  await prisma.users.deleteMany({});

  await prisma.users.createMany({
    data: [
      {
        id: 1,
        user: "joao.silva",
        email: "joao.silva@exemplo.com",
        password: "joaosilva",
        name: "João Silva",
      },
      {
        id: 2,
        user: "maria.souza",
        email: "maria.souza@exemplo.com",
        password: "mariasouza",
        name: "Maria Souza",
        picture:
          "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436182.jpg?w=826&t=st=1681513050~exp=1681513650~hmac=afa659d8618c73e9faacca541bc584a51a1a052011ea6b70ed7c6af846881379",
      },
      {
        id: 3,
        user: "arthur.almeida",
        email: "arthur.almeida@exemplo.com",
        password: "arthuralmeida",
        name: "Arthur Almeida",
        picture:
          "https://img.freepik.com/free-psd/3d-illustration-person-tank-top_23-2149436202.jpg?w=826&t=st=1681513153~exp=1681513753~hmac=055acd03c6a48c3e789d0a95f4289427f334b4a0c6e4870d693452c32ce1875c",
      },
      {
        id: 4,
        user: "ana.santos",
        email: "ana.santos@exemplo.com",
        password: "anasantos",
        name: "Ana Santos",
      },
    ],
  });

  await prisma.posts.createMany({
    data: [
      {
        user_id: 2,
        description: `Olá pessoal, confiram esse cogumelo lindo que encontrei durante minha caminhada hoje! 🍄😍
          \rTrata-se de um clássico Amanita muscaria, também conhecido como Cogumelo-de-moscas. 
          O chapéu vermelho vibrante com pintas brancas é tão marcante e único, não acham?
          \rEste cogumelo em particular estava crescendo próximo a um pinheiro e tinha cerca de 10cm de diâmetro. 
          Eu fui cuidadosa para não tocá-lo, pois ele é tóxico e pode causar alucinações se ingerido.
          \rA natureza está cheia de maravilhas e surpresas, e encontrar este cogumelo foi definitivamente um ponto alto do meu dia!`,
        image:
          "https://images.unsplash.com/photo-1673263774598-6dc00859275d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW1hbml0YSUyMG11c2NhcmlhfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        species: "Amanita muscaria",
      },
      {
        user_id: 3,
        description: `Ei pessoal, olhem só o cogumelo incrível que encontrei durante minha caminhada! :)
          \rSe trata de um Hygrocybe spp. A cor vibrante e o formato curioso chamaram minha atenção logo de cara. 
          \rAdoro como a natureza nos surpreende e nos faz apreciar a beleza simples das coisas. Espero que vocês também possam desfrutar da natureza e encontrar tesouros escondidos como este!`,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Glossy_red_waxcap_Ferndale.jpg",
        species: "Hygrocybe spp.",
      },
      {
        user_id: 4,
        description: `Apreciando a beleza simples da natureza com esse cogumelo encontrado em uma de minhas caminhadas!`,
        image:
          "https://i0.wp.com/jeremybartlett.co.uk/wp-content/uploads/2013/11/IMG_1292-768x1024.jpg?resize=768%2C1024",
        species: "Hygrocybe spp.",
      },
    ],
  });
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
