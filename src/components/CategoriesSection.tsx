import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Earth, MapPin, Book, Camera, GalleryHorizontal, Users } from 'lucide-react';

const categories = [
	{
		name: 'Culture',
		icon: <Earth className="h-6 w-6" />,
		color: 'bg-green-100 text-green-600',
		description: 'Carnevals, festivals, museums, and unmissable aspects of local culture',
	},
	{
		name: 'History',
		icon: <Book className="h-6 w-6" />,
		color: 'bg-amber-100 text-amber-600',
		description: 'Ancient ruins, hidden monuments, and forgotten places',
	},
	{
		name: 'Nature',
		icon: <MapPin className="h-6 w-6" />,
		color: 'bg-blue-100 text-blue-600',
		description: 'Secret coves, secluded shores, marvelous scenery, and pristine beaches',
	},
	{
		name: 'Shopping',
		icon: <Camera className="h-6 w-6" />,
		color: 'bg-slate-100 text-slate-600',
		description: 'Unique boutiques, artisan shops, and local markets',
	},
	{
		name: 'Food',
		icon: <GalleryHorizontal className="h-6 w-6" />,
		color: 'bg-red-100 text-red-600',
		description: 'Local eateries, hidden restaurants, and food experiences',
	},
	{
		name: 'Entertainment',
		icon: <Users className="h-6 w-6" />,
		color: 'bg-purple-100 text-purple-600',
		description: 'Live music, performances, and local events',
	},
];

const CategoriesSection: React.FC = () => {
	return (
		<section className="py-12 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
					<p className="text-muted-foreground">
						Discover hidden gems organized by type of experience
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((category) => (
						<Link to={`/browse?category=${category.name}`} key={category.name}>
							<Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
								<CardContent className="p-6">
									<div className="flex items-start space-x-4">
										<div className={`p-3 rounded-lg ${category.color}`}>
											{category.icon}
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg">{category.name}</h3>
											<p className="text-sm text-muted-foreground mt-1">
												{category.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default CategoriesSection;
